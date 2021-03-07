import {APIError} from "../../src/common/baseError.js";
import {MachineQueryResultModel} from "../../src/domain/models/queryResults/machineQRMs.js";

import MachineRepository from "../../src/domain/repositories/machineRepository.js";

class MockMachineRepository extends MachineRepository {
    constructor(dbManager, result) {
        super(dbManager);
        this.result = result;
    }

    async existAsync(id){
        if(!id)
            throw new APIError(`id must be set to existAsync param`);

        //check count that means any row exist in database with this given id and return true/false
        return this.result;
    }

    //create new machine
    async insertAsync(data) {
        if(!data)
            throw new APIError(`data must be set to insertAsync param`);

        return this.result;
    }

    //update exist machine by machine_id and new info
    async updateAsync(id, data) {
        if(!id)
            throw new APIError(`id must be set to updateAsync param`);
        if(!data)
            throw new APIError(`data must be set to updateAsync param`);

        return this.result;
    }

    async updateByConditionsAsync({whereQry,data}) {
        if(!whereQry)
            throw new APIError(`whereQry must be set to updateByConditionsAsync param`);
        if(!data)
            throw new APIError(`data must be set to updateByConditionsAsync param`);

        return this.result;
    }

    //delete exist entity/dbTable by primaryKey like id
    async deleteAsync(id) {
        if(!id)
            throw new APIError(`id must be set to deleteAsync param`);

        let whereQry = {
            machine_id: id,
        };

        return this.result;
    }

    //get one entity info by primary key like id
    async fetchOneAsync(id) {
        if(!id)
            throw new APIError(`id must be set to fetchOneAsync param`);

        if(!this.result) return null;

        return new MachineQueryResultModel({machine_id:id});
    }

    //get all exist entity/dbTable info filter by any query conditions
    async fetchAllAsync({whereQry = {}, conditionType= "AND", offset=-1, limit =-1}) {
        if(!this.result) return [];

        return this.result;
    }
}

export default MockMachineRepository;