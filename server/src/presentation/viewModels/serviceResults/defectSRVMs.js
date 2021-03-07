import machineStatusList from "../../../constants/MachineStatusList.js";
import {APIError} from "../../../common/baseError.js";

export class DefectApiResponseViewModel {
    constructor(entityModel) {
        if(!entityModel) {
            throw new APIError('FATAL ERROR: entityModel is not defined for DefectApiResponseViewModel class.');
        }
        this.defectId = entityModel.id;
        this.personalNumber = entityModel.personal_number;
        this.description = entityModel.description;
        this.status = entityModel.status;
        //get static value of status 1,2,... depend on development discuss {number: 1, text: "pending"}
        const status = machineStatusList.MACHINE_STATUS_LIST.find(v => v.number === entityModel.status)
        this.status = status ? status.text : entityModel.status;
        this.machineId = entityModel.machine_id;
        this.defectTime = entityModel.defect_time;
    }
}
