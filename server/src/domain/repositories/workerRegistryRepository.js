import {WorkerRegistryQueryResultModel} from "../models/queryResults/workerRegistryQRMs.js";
import {APIError} from "../../common/baseError.js";

//All CRUD : a repository communicate with a Table/Entity in Database. Note: Should be without any complex logic
class WorkerRegistryRepository {
    constructor(dbManager) {
        if(!dbManager)
            throw new Error(`dbManager must be set to WorkerRegistryRepository constructor`);
            
        this._DBManager = dbManager;
        this._tb = "worker_registry";
        this.existAsync = this.existAsync.bind(this);
        this.insertAsync = this.insertAsync.bind(this);
        this.updateAsync = this.updateAsync.bind(this);
        this.deleteAsync = this.deleteAsync.bind(this);
        this.fetchOneAsync = this.fetchOneAsync.bind(this);
        this.fetchAllAsync = this.fetchAllAsync.bind(this);
    }

    //check an entity is exist in database with the given personal_number as a primaryKey
    async existAsync(personal_number){
        if(!personal_number)
            throw new APIError(`personal_number must be set to existAsync param`);
        
        let whereQry = {
            personal_number: personal_number,
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

        return result.rows[0].personal_number;
    }

    //update exist machine by machine_id and new info
    async updateAsync(id, data) {
        if(!id)
            throw new APIError(`id must be set to updateAsync param`);
        if(!data)
            throw new APIError(`data must be set to updateAsync param`);
        
        let whereQry = {
            id: id,
        };

        return  await this._DBManager.dataUpdate(this._tb, data, whereQry);
    }

    //delete exist entity/dbTable by primaryKey like id
    async deleteAsync(id) {
        if(!id)
            throw new APIError(`id must be set to deleteAsync param`);

        let whereQry = {
            id: id,
        };

        return  await this._DBManager.dataDelete(this._tb, whereQry);
    }

    //get one entity info by primary key like id
    async fetchOneAsync(id) {
        if(!id)
            throw new APIError(`id must be set to fetchOneAsync param`);
        
        const whereQry = {
            id:id,
        };
        
        let result = [];
        result = await this._DBManager.getData(
            this._tb,
            "personal_number, name",
            whereQry
        );

        const dbModel = result && result.rows && result.rows.length > 0 ? result.rows[0] : null;

        if(!dbModel) return null;

        return new WorkerRegistryQueryResultModel(dbModel);
    }

    //get all exist entity/dbTable info filter by any query conditions
    async fetchAllAsync({whereQry = {}, conditionType= "AND", offset=-1, limit =-1}) {
        let result = [];
        result = await this._DBManager.getData(
            this._tb,
            "personal_number, name",
            whereQry,
            conditionType,
            offset,
            limit,
            " ORDER BY personal_number ASC"
        );
        let dbModels = [];
        dbModels = result && result.rows && result.rows.length > 0 ? result.rows : [];

        let entities = [];
        let i;
        for (i = 0; i < dbModels.length; i++) {
            const dbModel = dbModels[i]
            entities.push(new WorkerRegistryQueryResultModel(dbModel));
        }

        return entities;
    }
};

export default WorkerRegistryRepository;