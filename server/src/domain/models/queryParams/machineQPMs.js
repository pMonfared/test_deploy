export class MachineUpdateQueryParamModel {
    constructor(serviceVM) {
        if(!serviceVM) {
            throw new Error('FATAL ERROR: serviceVM is not defined for MachineUpdateQueryParamModel class.');
        }
        this.shift = serviceVM.shift;
        this.status = serviceVM.status;
        this.selected_orders = serviceVM.selected_orders;
        this.workplace_id = serviceVM.workplace_id;
        this.parallel_orders = serviceVM.parallel_orders;
    }
}

export class MachineInsertQueryParamModel extends MachineUpdateQueryParamModel{
    constructor(serviceVM) {
        if(!serviceVM) {
            throw new Error('FATAL ERROR: serviceVM is not defined for MachineInsertQueryParamModel class.');
        }
        super(serviceVM);
        this.machine_id = serviceVM.machine_id;
    }
}