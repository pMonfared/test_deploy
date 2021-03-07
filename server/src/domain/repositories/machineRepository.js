import {MachineQueryResultModel} from "../models/queryResults/machineQRMs.js";
import {APIError} from "../../common/baseError.js";


//All CRUD : a repository communicate with a Table/Entity in Database. Note: Should be without any complex logic
class MachineRepository {
    constructor(dbManager) {
        if(!dbManager)
            throw new Error(`dbManager must be set to MachineRepository constructor`);
            
        this._DBManager = dbManager;
        this._tb = "machine";
        
        this.existAsync = this.existAsync.bind(this);
        this.insertAsync = this.insertAsync.bind(this);
        this.updateAsync = this.updateAsync.bind(this);
        this.updateByConditionsAsync = this.updateByConditionsAsync.bind(this);
        this.deleteAsync = this.deleteAsync.bind(this);
        this.fetchOneAsync = this.fetchOneAsync.bind(this);
        this.fetchAllAsync = this.fetchAllAsync.bind(this);
    }

    //check an entity is exist in database with the given id as a primaryKey
    async existAsync(id){
        if(!id)
            throw new APIError(`id must be set to existAsync param`);
        
        let whereQry = {
            machine_id: id,
        };

        //should check id is exist in database and return count
        let resultCount = [];
        resultCount = await this._DBManager.countRecord(this._tb, whereQry);

        //check count that means any row exist in database with this given id and return true/false
        return resultCount && resultCount.rows[0].total > 0;
    }

    //create new machine
    async insertAsync(data) {
        if(!data)
            throw new APIError(`data must be set to insertAsync param`);

        const result = await this._DBManager.dataInsert(this._tb, data);

        return result.rows[0].machine_id;
    }

    //update exist machine by machine_id and new info
    async updateAsync(id, data) {
        if(!id)
            throw new APIError(`id must be set to updateAsync param`);
        if(!data)
            throw new APIError(`data must be set to updateAsync param`);
        
        let whereQry = {
            machine_id: id,
        };
        
        return await this._DBManager.dataUpdate(this._tb, data, whereQry);
    }

    async updateByConditionsAsync({whereQry,data}) {
        if(!whereQry)
            throw new APIError(`whereQry must be set to updateByConditionsAsync param`);
        if(!data)
            throw new APIError(`data must be set to updateByConditionsAsync param`);

        return await this._DBManager.dataUpdate(this._tb, data, whereQry);
    }

    //delete exist entity/dbTable by primaryKey like id
    async deleteAsync(id) {
        if(!id)
            throw new APIError(`id must be set to deleteAsync param`);

        let whereQry = {
            machine_id: id,
        };

       return await this._DBManager.dataDelete(this._tb, whereQry);
    }

    //get one entity info by primary key like id
    async fetchOneAsync(id) {
        if(!id)
            throw new APIError(`id must be set to fetchOneAsync param`);

        const whereQry = {
            machine_id:id,
        };
        
        const result = await this._DBManager.getData(
            this._tb,
            "machine_id, machine_type, shift, status, selected_orders, parallel_orders, workplace_id",
            whereQry
        );
        
        const dbModel = result && result.rows && result.rows.length > 0 ? result.rows[0] : null;
        
        if(!dbModel) return null;

        return new MachineQueryResultModel(dbModel);
    }

    //get all exist entity/dbTable info filter by any query conditions
    async fetchAllAsync({whereQry = {}, conditionType= "AND", offset=-1, limit =-1}) {
        const result = await this._DBManager.getData(
            this._tb,
            "machine_id, machine_type, shift, status, selected_orders, parallel_orders, workplace_id",
            whereQry,
            conditionType,
            offset,
            limit,
            " ORDER BY machine_id ASC"
        );

        const dbModels = result && result.rows && result.rows.length > 0 ? result.rows : [];

        let entities = [];
        let i;
        for (i = 0; i < dbModels.length; i++) {
            const dbModel = dbModels[i]
            entities.push(new MachineQueryResultModel(dbModel));
        }
        
        return entities;
    }
}

export default MachineRepository;