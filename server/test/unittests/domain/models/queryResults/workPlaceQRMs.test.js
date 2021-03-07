import {WorkPlaceQueryResultModel} from "../../../../../src/domain/models/queryResults/workPlaceQRMs.js";

describe("workPlaceQRMs.Tests", ()=> {
    describe('WorkPlaceQueryResultModel.Tests',()=>{
        it("should get Error 'dbModel' when generate instance of QRModel class without fill constructor params",()=>{
            try {
                let qrm = new WorkPlaceQueryResultModel();
                expect(qrm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("FATAL ERROR: dbModel is not defined for WorkPlaceQueryResultModel class.");
            }

        })

        it("should get a new instance of QRModel class", () => {
            try {
                let qrm = new WorkPlaceQueryResultModel({});
                expect(qrm).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }
        })
    })
})