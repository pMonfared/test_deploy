import {DefectApiResponseViewModel } from '../../../../../src/presentation/viewModels/serviceResults/defectSRVMs.js'

describe("defectSRVMs.Tests", ()=> {
    
    describe('DefectApiResponseViewModel.Tests',()=>{
        it("should get Error 'entityModel' when generate instance of Vm class without fill constructor params",()=>{
            try {
                let vm = new DefectApiResponseViewModel();
                expect(vm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.internalError).toBe("FATAL ERROR: entityModel is not defined for DefectApiResponseViewModel class.");
            }
            
        })
    
        it("should get a new instance of Vm class", () => {
            try {
                let vm = new DefectApiResponseViewModel({});
                expect(vm).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }
        })
    })
    
})