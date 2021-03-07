export class DefectUpdateQueryParamModel {
    constructor(serviceVM) {
        if(!serviceVM) {
            throw new Error('FATAL ERROR: serviceVM is not defined for DefectUpdateQueryParamModel class.');
        }
        this.personal_number = serviceVM.personalNumber;
        this.description = serviceVM.description;
        this.status = serviceVM.status;
        this.machine_id = serviceVM.machineId;
        this.defect_time = serviceVM.defectTime;
    }
}

export class DefectInsertQueryParamModel extends DefectUpdateQueryParamModel{
    constructor(serviceVM) {
        if(!serviceVM) {
            throw new Error('FATAL ERROR: serviceVM is not defined for DefectInsertQueryParamModel class.');
        }
        super(serviceVM);
    }
}

