import {DefectInsertQueryParamModel,DefectUpdateQueryParamModel} from '../../../../../src/domain/models/queryParams/defectQPMs.js'


describe("defectQPMs.Tests", ()=> {
    describe('DefectInsertQueryParamModel.Tests',()=>{
        it("should get Error 'serviceVM' when generate instance of QPModel class without fill constructor params",()=>{
            try {
                let vm = new DefectInsertQueryParamModel();
                expect(vm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("FATAL ERROR: serviceVM is not defined for DefectInsertQueryParamModel class.");
            }

        })

        it("should get a new instance of Vm class", () => {
            try {
                let vm = new DefectInsertQueryParamModel({});
                expect(vm).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }
        })
    })

    describe('DefectUpdateQueryParamModel.Tests',()=>{
        it("should get Error 'serviceVM' when generate instance of QPModel class without fill constructor params",()=>{
            try {
                let vm = new DefectUpdateQueryParamModel();
                expect(vm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("FATAL ERROR: serviceVM is not defined for DefectUpdateQueryParamModel class.");
            }

        })

        it("should get a new instance of QPModel class", () => {
            try {
                let vm = new DefectUpdateQueryParamModel({});
                expect(vm).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }
        })
    })

})