import {MachineQueryResultModel} from "../../../../../src/domain/models/queryResults/machineQRMs.js";

describe("machineQRMs.Tests", ()=> {
    describe('MachineQueryResultModel.Tests',()=>{
        it("should get Error 'dbModel' when generate instance of QRModel class without fill constructor params",()=>{
            try {
                let qrm = new MachineQueryResultModel();
                expect(qrm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("FATAL ERROR: dbModel is not defined for MachineQueryResultModel class.");
            }

        })

        it("should get a new instance of QRModel class", () => {
            try {
                let qrm = new MachineQueryResultModel({});
                expect(qrm).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }
        })
    })
})