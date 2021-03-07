export class WorkPlaceQueryResultModel {
    constructor(dbModel) {
        if(!dbModel) {
            throw new Error('FATAL ERROR: dbModel is not defined for WorkPlaceQueryResultModel class.');
        }
        this.workplace_id = dbModel.workplace_id;
        this.workplace_type = dbModel.workplace_type;
    }
}