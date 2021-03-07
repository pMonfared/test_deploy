export class MachineApiResponseViewModel {
    constructor(entityModel) {
        this.machineId = entityModel.machine_id;
        this.shift = entityModel.shift;
        this.status = entityModel.status;
        this.selectedOrders = entityModel.selected_orders;
        this.workplaceId = entityModel.workplace_id;
        this.parallelOrders = entityModel.parallel_orders;
    }
}
