import DefectServices from "../../src/presentation/services/defectServices.js";
import {APIError, HTTP404Error} from "../../src/common/baseError.js";
import {DefectApiResponseViewModel} from "../../src/presentation/viewModels/serviceResults/defectSRVMs.js";
import machineStatusList from "../../src/constants/MachineStatusList.js";

class MockDefectServices extends DefectServices{
    constructor(result) {
        super({},{},{});
        this.result = result;
    }
    async getInfoAsync(machineId) {

        let viewModels = [];

        let i;
        for (i = 0; i < this.result.length; i++) {
            const entityModel = this.result[i]
            viewModels.push(new DefectApiResponseViewModel(entityModel));
        }

        return viewModels;
    }
    async insertInfoAsync({personalNumber, description, machineId}){
        return {id : this.result ? this.result : null};
    }
    async getStatusAsync(machineId){
        if(this.result)
            return new DefectApiResponseViewModel(this.result);
        else
            throw new HTTP404Error("getDefectStatus-2", "DefectNotFound", "Any Defects with this given Machine Id doesn't exist");

    }
    async updateStatusAsync({machineId, defectTime, status}){
        let message = "Successfully updated the status of defect";
        //status when is equal 3 should update machineId status to value : 1 (Pending)
        if(status === 3) {
            message = message + " and set the status of the machine with Id:" + machineId + " to: " + machineStatusList.Pending.text
        }

        return { message }
    }
    async getAllAsync(){
        return this.result;
    }
}

export default MockDefectServices;