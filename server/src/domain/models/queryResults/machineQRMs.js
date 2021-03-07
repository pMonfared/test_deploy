export class MachineQueryResultModel {
    constructor(dbModel) {
        if(!dbModel) {
            throw new Error('FATAL ERROR: dbModel is not defined for MachineQueryResultModel class.');
        }
        this.machine_id = dbModel.machine_id;
        this.shift = dbModel.shift;
        this.status = dbModel.status;
        this.selected_orders = dbModel.selected_orders;
        this.workplace_id = dbModel.workplace_id;
        this.parallel_orders = dbModel.parallel_orders;
    }
}