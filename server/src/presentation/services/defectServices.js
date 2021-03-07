
import {DefectUpdateQueryParamModel,DefectInsertQueryParamModel} from "../../domain/models/queryParams/defectQPMs.js"

import {DefectApiResponseViewModel} from "../viewModels/serviceResults/defectSRVMs.js"
import {SetDefectInfoApiRequestViewModel} from "../viewModels/serviceParams/defectSPVMs.js"
import {APIError, HTTP400Error, HTTP404Error} from '../../common/baseError.js';
import moment from "moment-timezone";
import logger from '../../startup/logger.js'
import machineStatusList from "../../constants/MachineStatusList.js";

//All logic as service communicate with any repository as need
class DefectServices {
    constructor(machineRepo,defectRepo,workerRegistryRepo) {
        if(!machineRepo)
            throw new Error(`machineRepo must be set to DefectServices constructor`);
        
        if(!defectRepo)
            throw new Error(`defectRepo must be set to DefectServices constructor`)
        
        if(!workerRegistryRepo)
            throw new Error(`workerRegistryRepo must be set to DefectServices constructor`)
        
        //private props or function
        this._machineRepo = machineRepo;
        this._defectRepo = defectRepo;
        this._workerRegistryRepo = workerRegistryRepo;
        //public props or function
        this.getInfoAsync = this.getInfoAsync.bind(this);
        this.insertInfoAsync = this.insertInfoAsync.bind(this);
        this.getStatusAsync = this.getStatusAsync.bind(this);
        this.updateStatusAsync = this.updateStatusAsync.bind(this);
        this.getAllAsync = this.getAllAsync.bind(this);
    }
    async getInfoAsync(machineId) {
        if(!machineId)
            throw new APIError( "machineId must set for getInfoAsync","getDefectInfo-1");

        //get true/false by checking any machine is exist with this given machineId
        const machineIsExist = await this._machineRepo.existAsync(machineId);
        
        //if there is must return badRequest Error with blow message
        if(machineIsExist === false)
            throw new HTTP400Error("getDefectInfo-2","MachineBadRequest", "Machine Id doesn't exist");

        //generate an object as filter like db query to get all defects by given machineId
        const filter = {
            machine_id : machineId,
        };
        
        let entityModels = [];
        entityModels = await this._defectRepo.fetchAllAsync(filter);

        let viewModels = [];
        
        let i;
        //loop fetched recived data from repository (Domain/DataLayer) map to ViewModel to send response 
        for (i = 0; i < entityModels.length; i++) {
            const entityModel = entityModels[i]
            //mapping DbModel to ViewModel
            viewModels.push(new DefectApiResponseViewModel(entityModel));
        }

        return viewModels;
    }
    async insertInfoAsync({personalNumber, description, machineId}){
        //mapping req.body to ViewModel (ApiRequestModel)
        let reqVm = new SetDefectInfoApiRequestViewModel(personalNumber,description,machineId);
        
        //check any worker registry with this given personalNumber
        const workerRegistryIsExist = await this._workerRegistryRepo.existAsync(reqVm.personalNumber);

        //if there isn't any worker must send badRequest to response with below detail
        if(workerRegistryIsExist === false)
            throw new HTTP400Error("setDefect-1","WorkerRegistryBadRequest", "Invalid personal number");

        //check machine also must be there in database
        const machineIsExist = await this._machineRepo.existAsync(reqVm.machineId);

        //if there is not must send badRequest error 
        if(machineIsExist === false)
            throw new HTTP400Error("setDefect-2","MachineBadRequest", "Invalid machine id");
        
        //add two new props to reqVM object as our flow
        reqVm["defectTime"] = moment().tz('Europe/Berlin').format('YYYYMMDD HHmmss');
        reqVm["status"] = 1;
            
        //map ApiRequestModel (ViewModel) to DbModel (QueryParamModel)
        const queryParamModel = new DefectInsertQueryParamModel(reqVm);
        
        //Fire Repository to Insert mapped model to Database and return Entity.Id
        const id = await this._defectRepo.insertAsync(queryParamModel);

        //log information about this flow as we need
        logger.info(`set defect with the machine_id:${machineId} and return defectId:${id} successfully`)
        
        return {id : id};
    }
    async getStatusAsync(machineId){
        //check machine must be there in database
        const machineIsExist = await this._machineRepo.existAsync(machineId);

        //if there is not must send badRequest error 
        if(machineIsExist === false)
            throw new HTTP400Error("getDefectStatus-1","MachineNotFound", "Machine Id doesn't exist");

        //generate an object as filter like db query to get all defects by given machineId
        const filter = {
            machine_id : machineId,
        };
        
        let entityModels = [];
        //fetch orderBy desc defect_time field and one latest defect filter by machineId
        entityModels = await this._defectRepo.fetchAllAsync({
            whereQuery : filter,
            limit:1,
            offset:0,
            orderBy: "defect_time", 
            orderByAsc: false});
        
        if(entityModels && entityModels.length > 0)
            //mapped DbModel (QueryResultModel) to ViewModel (ApiResponseModel)
          return new DefectApiResponseViewModel(entityModels[0]);
        else
          throw new HTTP404Error("getDefectStatus-2", "DefectNotFound", "Any Defects with this given Machine Id doesn't exist");

    }
    async updateStatusAsync({machineId, defectTime, status}){
        //check machine must be there in database
        const machineIsExist = await this._machineRepo.existAsync(machineId);
        
        //if there is not must send badRequest error 
        if(machineIsExist === false)
            throw new HTTP400Error("updateDefectStatus-1","MachineBadRequest", "Machine Id doesn't exist");

        //generate an object as filter like db query
        const filterDefect = {
            machine_id : machineId,
            defect_time: defectTime
        };
        
        //check there are any defects with 2 props condition : machineId and defectTime 
        const defectsIsExist = await this._defectRepo.existByConditionsAsync(filterDefect);

        //if there isn't any defect send message as 400 status code with full message
        if(defectsIsExist === false)
            throw new HTTP400Error("updateDefectStatus-2","DefectBadRequest", "Any Defect with these given params dosn't exist");
        
        //which field of table must be updated to a specific value
        const dataDefectMustbeUpdate = {
            status : status
        }
        
        //update all rows filtered by "filterDefect" and update to "dataDefectMustbeUpdate" 
        await this._defectRepo.updateByConditionsAsync({whereQry:filterDefect, data: dataDefectMustbeUpdate})
        
        let message = "Successfully updated the status of defect";
        //status when is equal 3 should update machineId status to value : 1 (Pending)
        if(status === 3) {
            await this._machineRepo.updateAsync(machineId, {status: machineStatusList.Pending.number})
            message = message + " and set the status of the machine with Id:" + machineId + " to: " + machineStatusList.Pending.text
        }

        //add log of what's happend to this operate
        logger.info(message);

        return { message }
    }
    async getAllAsync(){
        let defects = {
            pending : [],
            in_process: [],
            completed: []
        }
        
        //get all pending defects by Status = 1
        const pendingDefects = await this._defectRepo.fetchAllJoinWorkerRegistryFilterByStatusAsync(machineStatusList.Pending.number);
        //get all in_process defects by Status = 2
        const in_processDefects = await this._defectRepo.fetchAllJoinWorkerRegistryFilterByStatusAsync(machineStatusList.InProcess.number);
        //get all completed defects by Status = 3
        const completedDefects = await this._defectRepo.fetchAllJoinWorkerRegistryFilterByStatusAsync(machineStatusList.Completed.number);
        
        defects.pending = pendingDefects;
        defects.in_process = in_processDefects;
        defects.completed = completedDefects;
        
        return defects;
    }
};

export default DefectServices;