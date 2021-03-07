export class WorkerRegistryQueryResultModel {
    constructor(dbModel) {
        if(!dbModel) {
            throw new Error('FATAL ERROR: dbModel is not defined for WorkerRegistryQueryResultModel class.');
        }
        this.personal_number = dbModel.personal_number;
        this.name = dbModel.name;
    }
}