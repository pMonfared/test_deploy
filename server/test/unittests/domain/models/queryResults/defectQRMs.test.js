import {DefectJoinWorkerRegistryQueryResultModel,DefectQueryResultModel} from "../../../../../src/domain/models/queryResults/defectQRMs.js"

describe("defectQRMs.Tests", ()=> {
    describe('DefectJoinWorkerRegistryQueryResultModel.Tests',()=>{
        it("should get Error 'dbModel' when generate instance of QRModel class without fill constructor params",()=>{
            try {
                let qrm = new DefectJoinWorkerRegistryQueryResultModel();
                expect(qrm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("FATAL ERROR: dbModel is not defined for DefectJoinWorkerRegistryQueryResultModel class.");
            }

        })

        it("should get a new instance of QRModel class", () => {
            try {
                let qrm = new DefectJoinWorkerRegistryQueryResultModel({});
                expect(qrm).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }
        })
    })

    describe('DefectQueryResultModel.Tests',()=>{
        it("should get Error 'dbModel' when generate instance of QRModel class without fill constructor params",()=>{
            try {
                let qrm = new DefectQueryResultModel();
                expect(qrm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("FATAL ERROR: dbModel is not defined for DefectQueryResultModel class.");
            }

        })

        it("should get a new instance of QRModel class", () => {
            try {
                let qrm = new DefectQueryResultModel({});
                expect(qrm).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }
        })
    })

})