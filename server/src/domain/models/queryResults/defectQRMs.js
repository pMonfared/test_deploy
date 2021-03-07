export class DefectJoinWorkerRegistryQueryResultModel {
    constructor(dbModel) {
        if(!dbModel) {
            throw new Error('FATAL ERROR: dbModel is not defined for DefectJoinWorkerRegistryQueryResultModel class.');
        }
        this.id = dbModel.id;
        this.personal_number = dbModel.personal_number;
        this.description = dbModel.description;
        this.status = dbModel.status;
        this.machine_id = dbModel.machine_id;
        this.defect_time = dbModel.defect_time;
        this.worker_registry_name = dbModel.worker_registry_name
    }
}

export class DefectQueryResultModel{
    constructor(dbModel) {
        if(!dbModel) {
            throw new Error('FATAL ERROR: dbModel is not defined for DefectQueryResultModel class.');
        }
        this.id = dbModel.id;
        this.personal_number = dbModel.personal_number;
        this.description = dbModel.description;
        this.status = dbModel.status;
        this.machine_id = dbModel.machine_id;
        this.defect_time = dbModel.defect_time;
    }
}

