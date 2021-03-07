import "babel-polyfill"

import DefectController from "../../../src/controllers/defectController.js";
import MockDefectServices from "../../setup/mockDefectServices.js";

describe('defectController.it', async () => {
    let serviceResult;

    let mReq;
    let mRes;
    let mNext;
    beforeEach(() => {
        mRes = { status: jest.fn().mockReturnThis(), send: jest.fn().mockReturnThis() };
        mNext = () => jest.fn()
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    const exec = () => {
        const mockedSv = new MockDefectServices(serviceResult);
        return new DefectController(mockedSv);
    }
    
    
    it('should getAllAsync return an object with 3 empty array', async () => {
        let defects = {
            pending : [],
            in_process: [],
            completed: []
        }

        const pendingDefects = [{id:1},{id:2},{id:3}];
        const in_processDefects = [{id:4},{id:5},{id:6},{id:7}];
        const completedDefects = [{id:8},{id:9}];

        defects.pending = pendingDefects;
        defects.in_process = in_processDefects;
        defects.completed = completedDefects;
        
        
        serviceResult = defects;
        const defectCr = exec();
        await defectCr.getAllAsync(mReq,mRes,mNext)
        expect(mRes.status).toBeCalledWith(200);
        expect(mRes.send).toHaveBeenCalledWith(defects);
    });


    it('should getAllAsync return an Error', async () => {
        const defectCr = exec();
        try {
            await defectCr.getAllAsync(null,null,null);
            expect(defectCr).toBe(null)
        }catch (e){
            expect(e).toBeDefined()
        }
    });

    it('should getInfoAsync return an object', async () => {
        serviceResult = {machineId:1,status:3};
        mReq = {
            params:{
                machineId: 1
            }
        }

        const defectCr = exec();
        await defectCr.getInfoAsync(mReq,mRes,mNext)
        expect(mRes.status).toBeCalledWith(200);
        
    });


    it('should getInfoAsync return an Error', async () => {
        const defectCr = exec();
        try {
            await defectCr.getInfoAsync(null,null,null);
            expect(defectCr).toBe(null)
        }catch (e){
            expect(e).toBeDefined()
        }
    });

    it('should getStatusAsync return an object', async () => {
        serviceResult = {machineId:1,status:3};
        mReq = {
            params:{
                machineId: 1
            }
        }

        const defectCr = exec();
        await defectCr.getStatusAsync(mReq,mRes,mNext)
        expect(mRes.status).toBeCalledWith(200);

    });


    it('should getStatusAsync return an Error', async () => {
        const defectCr = exec();
        try {
            await defectCr.getStatusAsync(null,null,null);
            expect(defectCr).toBe(null)
        }catch (e){
            expect(e).toBeDefined()
        }
    });


    it('should insertInfoAsync return an object', async () => {
        serviceResult = {machineId:1,status:3};
        mReq = {
            body:{
                machineId: 1
            }
        }

        const defectCr = exec();
        await defectCr.insertInfoAsync(mReq,mRes,mNext)
        expect(mRes.status).toBeCalledWith(201);

    });


    it('should insertInfoAsync return an Error', async () => {
        const defectCr = exec();
        try {
            await defectCr.insertInfoAsync(null,null,null);
            expect(defectCr).toBe(null)
        }catch (e){
            expect(e).toBeDefined()
        }
    });

    it('should updateStatusAsync return an object', async () => {
        serviceResult = {machineId:1,status:3};
        mReq = {
            body:{
                machineId: 1
            }
        }

        const defectCr = exec();
        await defectCr.updateStatusAsync(mReq,mRes,mNext)
        expect(mRes.status).toBeCalledWith(200);

    });


    it('should updateStatusAsync return an Error', async () => {
        const defectCr = exec();
        try {
            await defectCr.updateStatusAsync(null,null,null);
            expect(defectCr).toBe(null)
        }catch (e){
            expect(e).toBeDefined()
        }
    });

   
})