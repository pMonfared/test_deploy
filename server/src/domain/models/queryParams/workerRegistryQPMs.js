export class WorkerRegistryUpdateQueryParamModel {
    constructor(serviceVM) {
        if(!serviceVM) {
            throw new Error('FATAL ERROR: serviceVM is not defined for WorkerRegistryUpdateQueryParamModel class.');
        }
        this.name = serviceVM.name;
    }
}


export class WorkerRegistryInsertQueryParamModel extends WorkerRegistryUpdateQueryParamModel {
    constructor(serviceVM) {
        if(!serviceVM) {
            throw new Error('FATAL ERROR: serviceVM is not defined for WorkerRegistryInsertQueryParamModel class.');
        }
        super(serviceVM)
        this.personal_number = serviceVM.personal_number;
    }
}