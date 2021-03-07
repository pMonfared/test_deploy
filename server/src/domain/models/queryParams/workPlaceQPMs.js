export class WorkPlaceUpdateQueryParamModel {
    constructor(serviceVM) {
        if(!serviceVM) {
            throw new Error('FATAL ERROR: serviceVM is not defined for WorkPlaceUpdateQueryParamModel class.');
        }
        this.workplace_id = serviceVM.workplace_id;
        this.workplace_type = serviceVM.workplace_type;
    }
}


export class WorkPlaceInsertQueryParamModel extends WorkPlaceUpdateQueryParamModel {
    constructor(serviceVM) {
        if(!serviceVM) {
            throw new Error('FATAL ERROR: serviceVM is not defined for WorkPlaceInsertQueryParamModel class.');
        }
        super(serviceVM)
    }
}