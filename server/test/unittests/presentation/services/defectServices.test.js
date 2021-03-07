import "babel-polyfill"

import DefectServices from "../../../../src/presentation/services/defectServices.js";
import MockDefectRepository from "../../../setup/mockDefectRepository.js";
import MockMachineRepository from "../../../setup/mockMachineRepository.js";
import MockWorkerRegistryRepository from "../../../setup/mockWorkerRegistryRepository.js";
import {HTTP400Error} from "../../../../src/common/baseError.js";
import machineStatusList from "../../../../src/constants/MachineStatusList.js";

describe("defectServices.Tests", ()=> {

    describe("generate.Class.Tests",()=>{
        it("should get Error 'machineRepo' when generate instance of defectServices class without fill constructor params",()=>{
            try {
                let svr = new DefectServices();
                expect(svr).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("machineRepo must be set to DefectServices constructor");
            }

        })

        it("should get Error 'defectRepo' when generate instance of defectServices class without fill constructor params",()=>{
            try {
                let svr = new DefectServices({});
                expect(svr).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("defectRepo must be set to DefectServices constructor");
            }

        })

        it("should get Error 'workerRegistryRepo' when generate instance of defectServices class without fill constructor params",()=>{
            try {
                let svr = new DefectServices({},{});
                expect(svr).toBe(null);
            } catch (e) {
                expect(e).toBeDefined();
                expect(e.message).toBe("workerRegistryRepo must be set to DefectServices constructor");
            }

        })

        it("should get generated an instance of defectServices class",()=>{
            try {
                let svr = new DefectServices({},{},{});
                expect(svr).toBeDefined();
            } catch (e) {
                expect(e).toBe(null);
            }

        })
    })

    describe("functions.Tests",()=>{
        let resultMachineRepoExpected = {};
        let resultDefectRepoExpected = {};
        let resultWorkerRegRepoExpected = {};
        
        beforeEach(() => {
            resultMachineRepoExpected = {}
            resultDefectRepoExpected = {}
            resultWorkerRegRepoExpected = {}
        })
        afterEach(() => {
            resultMachineRepoExpected = {}
            resultDefectRepoExpected = {}
            resultWorkerRegRepoExpected = {}
        })

        const exec = async () => {
            let mockedMachineRepo = new MockMachineRepository({},resultMachineRepoExpected);
            let mockedDefectRepo = new MockDefectRepository({},resultDefectRepoExpected);
            let mockedWorkerRegistryRepo = new MockWorkerRegistryRepository({},resultWorkerRegRepoExpected);
            return new DefectServices(mockedMachineRepo,mockedDefectRepo,mockedWorkerRegistryRepo)
        }

        describe("getInfoAsync.Tests", async ()=>{
            
            it("should return 'machineId must be set' Internal Server Error", async () => {
                resultDefectRepoExpected = false
                resultMachineRepoExpected = false
                try {
                    const defectRepo = await exec();
                    const actual = await defectRepo.getInfoAsync();
                    expect(actual).toBe(null);
                }catch (e){
                    expect(e).toBeDefined()
                    expect(e.code).toBe("getDefectInfo-1")
                    expect(e.internalError).toBe("machineId must set for getInfoAsync")
                }
            });

            it("should return MachineBadRequest NotFound by this give id", async () => {
                resultDefectRepoExpected = false
                resultMachineRepoExpected = false
                try {
                    const defectRepo = await exec();
                    const actual = await defectRepo.getInfoAsync(1);
                    expect(actual).toBe(null);
                }catch (e){
                    expect(e).toBeDefined()
                    expect(e.code).toBe("getDefectInfo-2")
                    expect(e.message).toBe("MachineBadRequest")
                }
            });

            it("should return empty array", async () => {
                resultDefectRepoExpected = []
                resultMachineRepoExpected = [{machine_id:1}]
                try {
                    const defectRepo = await exec();
                    const actual = await defectRepo.getInfoAsync(1);
                    expect(actual.length).toBe(0);
                }catch (e){
                    expect(e).toBeUndefined()
                }
            });

            it("should return filled array", async () => {
                resultDefectRepoExpected = [{machine_id:1,status:3}]
                resultMachineRepoExpected = [{machine_id:1}]
                try {
                    const defectRepo = await exec();
                    const actual = await defectRepo.getInfoAsync(1);
                    expect(actual.length).toBe(1);
                }catch (e){
                    expect(e).toBeUndefined()
                }
            });
            
        })

        describe("getStatusAsync.Tests", async ()=>{

            it("should return MachineBadRequest NotFound by this give id", async () => {
                resultDefectRepoExpected = []
                resultMachineRepoExpected = false
                try {
                    const defectRepo = await exec();
                    const actual = await defectRepo.getStatusAsync(1);
                    expect(actual).toBe(null);
                }catch (e){
                    expect(e).toBeDefined()
                    expect(e.code).toBe("getDefectStatus-1")
                    expect(e.message).toBe("MachineNotFound")
                }
            });
            
            it("should return 'DefectNotFound' NotFound Error", async () => {
                resultDefectRepoExpected = []
                resultMachineRepoExpected = true
                try {
                    const defectRepo = await exec();
                    const actual = await defectRepo.getStatusAsync(1);
                    expect(actual).toBe(null);
                }catch (e){
                    expect(e).toBeDefined()
                    expect(e.code).toBe("getDefectStatus-2")
                    expect(e.message).toBe("DefectNotFound")
                }
            });

            it("should return filled object", async () => {
                resultDefectRepoExpected = [{id:1,status:3}]
                resultMachineRepoExpected = true
                const statusEnum = machineStatusList.MACHINE_STATUS_LIST.find(v => v.number === resultDefectRepoExpected[0].status)
                try {
                    const defectRepo = await exec();
                    const actual = await defectRepo.getStatusAsync(1);
                    console.log(actual);
                    expect(actual.defectId).toBe(resultDefectRepoExpected[0].id);
                    expect(actual.status).toBe(statusEnum.text);
                }catch (e){
                    expect(e).toBeUndefined()
                }
            });

        })

        describe("insertInfoAsync.Tests", async () => {

            it("should return 'MachineBadRequest' when check exist machine badRequest", async () => {
                resultDefectRepoExpected = 1
                resultMachineRepoExpected = false
                resultWorkerRegRepoExpected = true
                let newInsertObj = {
                    personalNumber:"1",
                    description:"test-desc",
                    machineId:1
                }
                try {
                    const defectRepo = await exec();
                    const actual = await defectRepo.insertInfoAsync(newInsertObj);
                    expect(actual).toBe(null);
                }catch (e){
                    expect(e).toBeDefined()
                    expect(e.code).toBe("setDefect-2")
                    expect(e.message).toBe("MachineBadRequest")
                }
            });

            it("should return 'WorkerRegistryBadRequest' when check exist workerRegistry badRequest", async () => {
                resultDefectRepoExpected = 1
                resultMachineRepoExpected = true
                resultWorkerRegRepoExpected = false
                let newInsertObj = {
                    personalNumber:"1",
                    description:"test-desc",
                    machineId:1
                }
                try {
                    const defectRepo = await exec();
                    const actual = await defectRepo.insertInfoAsync(newInsertObj);
                    expect(actual).toBe(null);
                }catch (e){
                    expect(e).toBeDefined()
                    expect(e.code).toBe("setDefect-1")
                    expect(e.message).toBe("WorkerRegistryBadRequest")
                }
            });
            
            it("should return defined object", async () => {
                resultDefectRepoExpected = 1
                resultMachineRepoExpected = [{machine_id:1}]
                resultWorkerRegRepoExpected = true
                let newInsertObj = {
                    personalNumber:"1",
                    description:"test-desc",
                    machineId:1
                }
                try {
                    const defectRepo = await exec();
                    const actual = await defectRepo.insertInfoAsync(newInsertObj);
                    expect(actual).toBeDefined();
                    expect(actual.id).toBe(1);
                }catch (e){
                    expect(e).toBe(null)
                }
            });
        })

        describe("updateStatusAsync.Tests", async () => {

            it("should return 'MachineBadRequest' when check exist machine badRequest", async () => {
                resultDefectRepoExpected = true
                resultMachineRepoExpected = false
                let updateObj = {
                    machineId:1,
                    defectTime:"test-desc",
                    status:2
                }
                try {
                    const defectRepo = await exec();
                    const actual = await defectRepo.updateStatusAsync(updateObj);
                    expect(actual).toBe(null);
                }catch (e){
                    expect(e).toBeDefined()
                    expect(e.code).toBe("updateDefectStatus-1")
                    expect(e.message).toBe("MachineBadRequest")
                }
            });

            it("should return 'DefectBadRequest' when check exist workerRegistry badRequest", async () => {
                resultDefectRepoExpected = false
                resultMachineRepoExpected = true
                let updateObj = {
                    machineId:1,
                    defectTime:"test-desc",
                    status:2
                }
                try {
                    const defectRepo = await exec();
                    const actual = await defectRepo.updateStatusAsync(updateObj);
                    expect(actual).toBe(null);
                }catch (e){
                    expect(e).toBeDefined()
                    expect(e.code).toBe("updateDefectStatus-2")
                    expect(e.message).toBe("DefectBadRequest")
                }
            });

            it("should return defined object by status = 2", async () => {
                resultDefectRepoExpected = true
                resultMachineRepoExpected = true
                let updateObj = {
                    machineId:1,
                    defectTime:"test-desc",
                    status:2
                }
                try {
                    const defectRepo = await exec();
                    const actual = await defectRepo.updateStatusAsync(updateObj);
                    expect(actual).toBeDefined();
                    expect(actual.message).toBe("Successfully updated the status of defect");
                }catch (e){
                    expect(e).toBe(null)
                }
            });

            it("should return defined object by status = 3", async () => {
                resultDefectRepoExpected = true
                resultMachineRepoExpected = true
                let updateObj = {
                    machineId:1,
                    defectTime:"test-desc",
                    status:3
                }
                try {
                    const defectRepo = await exec();
                    const actual = await defectRepo.updateStatusAsync(updateObj);
                    expect(actual).toBeDefined();
                    expect(actual.message).toBe("Successfully updated the status of defect"+ " and set the status of the machine with Id:" + updateObj.machineId + " to: " + machineStatusList.Pending.text);
                }catch (e){
                    expect(e).toBe(null)
                }
            });
        })
    })
})