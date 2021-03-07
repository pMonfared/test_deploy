import {WorkPlaceInsertQueryParamModel,WorkPlaceUpdateQueryParamModel} from '../../../../../src/domain/models/queryParams/workPlaceQPMs.js'


describe("workerRegistryQPMs.Tests", ()=> {

    describe('WorkPlaceInsertQueryParamModel.Tests',()=>{
        it("should get Error 'serviceVM' when generate instance of QPModel class without fill constructor params",()=>{
            try {
                let vm = new WorkPlaceInsertQueryParamModel();
                expect(vm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("FATAL ERROR: serviceVM is not defined for WorkPlaceInsertQueryParamModel class.");
            }

        })

        it("should get a new instance of Vm class", () => {
            try {
                let vm = new WorkPlaceInsertQueryParamModel({});
                expect(vm).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }
        })
    })

    describe('WorkPlaceUpdateQueryParamModel.Tests',()=>{
        it("should get Error 'serviceVM' when generate instance of QPModel class without fill constructor params",()=>{
            try {
                let vm = new WorkPlaceUpdateQueryParamModel();
                expect(vm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("FATAL ERROR: serviceVM is not defined for WorkPlaceUpdateQueryParamModel class.");
            }

        })

        it("should get a new instance of QPModel class", () => {
            try {
                let vm = new WorkPlaceUpdateQueryParamModel({});
                expect(vm).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }
        })
    })

})