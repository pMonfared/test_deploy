import {APIError} from "../../../common/baseError.js";

export class SetDefectInfoApiRequestViewModel {
    constructor(personalNumber, description, machineId) {
        if(!personalNumber) {
            throw new APIError('FATAL ERROR: personalNumber is not defined for SetDefectInfoApiRequestViewModel class.');
        }

        if(!description) {
            throw new APIError('FATAL ERROR: description is not defined for SetDefectInfoApiRequestViewModel class.');
        }

        if(!machineId) {
            throw new APIError('FATAL ERROR: machineId is not defined for SetDefectInfoApiRequestViewModel class.');
        }
        
        this.personalNumber = personalNumber;
        this.description = description;
        this.machineId = machineId;
    }
}