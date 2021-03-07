import {MachineInsertQueryParamModel,MachineUpdateQueryParamModel} from '../../../../../src/domain/models/queryParams/machineQPMs.js'


describe("machineQPMs.Tests", ()=> {

    describe('MachineInsertQueryParamModel.Tests',()=>{
        it("should get Error 'serviceVM' when generate instance of QPModel class without fill constructor params",()=>{
            try {
                let vm = new MachineInsertQueryParamModel();
                expect(vm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("FATAL ERROR: serviceVM is not defined for MachineInsertQueryParamModel class.");
            }

        })

        it("should get a new instance of Vm class", () => {
            try {
                let vm = new MachineInsertQueryParamModel({});
                expect(vm).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }
        })
    })

    describe('MachineUpdateQueryParamModel.Tests',()=>{
        it("should get Error 'serviceVM' when generate instance of QPModel class without fill constructor params",()=>{
            try {
                let vm = new MachineUpdateQueryParamModel();
                expect(vm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("FATAL ERROR: serviceVM is not defined for MachineUpdateQueryParamModel class.");
            }

        })

        it("should get a new instance of QPModel class", () => {
            try {
                let vm = new MachineUpdateQueryParamModel({});
                expect(vm).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }
        })
    })

})