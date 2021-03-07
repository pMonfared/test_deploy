import {SetDefectInfoApiRequestViewModel} from '../../../../../src/presentation/viewModels/serviceParams/defectSPVMs.js'

describe("defectSPVMs.Tests", ()=> {
    
    describe('SetDefectInfoApiRequestViewModel.Tests',()=>{
        it("should get Error 'personalNumber' when generate instance of Vm class without fill constructor params",()=>{
            try {
                let vm = new SetDefectInfoApiRequestViewModel();
                expect(vm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.internalError).toBe("FATAL ERROR: personalNumber is not defined for SetDefectInfoApiRequestViewModel class.");
            }
            
        })
    
        it("should get Error 'description' when generate instance of Vm class without fill constractur params",()=>{
            try {
                let vm = new SetDefectInfoApiRequestViewModel('personalNumber-it');
                expect(vm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.internalError).toBe("FATAL ERROR: description is not defined for SetDefectInfoApiRequestViewModel class.");
            }
            
        })
    
        it("should get Error 'machineId' when generate instance of Vm class without fill constractur params",()=>{
            try {
                let vm = new SetDefectInfoApiRequestViewModel('personalNumber-it','desc-it');
                expect(vm).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.internalError).toBe("FATAL ERROR: machineId is not defined for SetDefectInfoApiRequestViewModel class.");
            }
            
        })
    
        it("should get a new instance of Vm class", () => {
            try {
                let vm = new SetDefectInfoApiRequestViewModel('personalNumber-it','desc-it',1);
                expect(vm).toBeDefined();
                expect(vm.personalNumber).toBe('personalNumber-it');
                expect(vm.description).toBe('desc-it');
                expect(vm.machineId).toBe(1);
            } catch (e) {
                expect(e).toBe(null);
            }
        })

    })
    
})