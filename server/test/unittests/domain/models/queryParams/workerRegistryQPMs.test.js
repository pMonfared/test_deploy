import {WorkerRegistryInsertQueryParamModel,WorkerRegistryUpdateQueryParamModel} from '../../../../../src/domain/models/queryParams/workerRegistryQPMs.js'


describe("workerRegistryQPMs.Tests", ()=> {

    describe('WorkerRegistryInsertQueryParamModel.Tests',()=>{
        it("should get Error 'serviceVM' when generate instance of QPModel class without fill constructor params",()=>{
            try {
                let vm = new WorkerRegistryInsertQueryParamModel();
                expect(vm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("FATAL ERROR: serviceVM is not defined for WorkerRegistryInsertQueryParamModel class.");
            }

        })

        it("should get a new instance of Vm class", () => {
            try {
                let vm = new WorkerRegistryInsertQueryParamModel({});
                expect(vm).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }
        })
    })

    describe('WorkerRegistryUpdateQueryParamModel.Tests',()=>{
        it("should get Error 'serviceVM' when generate instance of QPModel class without fill constructor params",()=>{
            try {
                let vm = new WorkerRegistryUpdateQueryParamModel();
                expect(vm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("FATAL ERROR: serviceVM is not defined for WorkerRegistryUpdateQueryParamModel class.");
            }

        })

        it("should get a new instance of QPModel class", () => {
            try {
                let vm = new WorkerRegistryUpdateQueryParamModel({});
                expect(vm).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }
        })
    })

})