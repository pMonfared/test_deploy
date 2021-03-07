import {WorkerRegistryQueryResultModel} from "../../../../../src/domain/models/queryResults/workerRegistryQRMs.js";

describe("workerRegistryQRMs.Tests", ()=> {
    describe('WorkerRegistryQueryResultModel.Tests',()=>{
        it("should get Error 'dbModel' when generate instance of QRModel class without fill constructor params",()=>{
            try {
                let qrm = new WorkerRegistryQueryResultModel();
                expect(qrm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("FATAL ERROR: dbModel is not defined for WorkerRegistryQueryResultModel class.");
            }

        })

        it("should get a new instance of QRModel class", () => {
            try {
                let qrm = new WorkerRegistryQueryResultModel({});
                expect(qrm).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }
        })
    })
})