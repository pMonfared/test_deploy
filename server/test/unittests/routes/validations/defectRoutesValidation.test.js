import DefectValidation from "../../../../src/routes/validations/defectRoutesValidation.js"

const defectValidation = new DefectValidation();


describe('DefectValidation getDefectInfoValidation', () => {
    it('should getDefectInfoValidation return throw 400 badrequst type of Error', () => {
        let req = {
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.getDefectInfoValidation(req,res,next)
            expect(nextFired).toBe(false);
        } catch (e) {
            expect(e.httpCode).toBe(400);
            expect(e.code).toBe("general-badRequest");
            expect(e.message).toBe("NOT FOUND");
            expect(e.description).toBe("bad request");
            expect(e.isOperational).toBe(true);
        }
    });
    
    it('should getDefectInfoValidation return throw 400 badrequst type of Error : machineId', () => {
        let req = {
            params:{
    
            }
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.getDefectInfoValidation(req,res,next)
            expect(nextFired).toBe(false);
        } catch (e) {
            expect(e.httpCode).toBe(400);
            expect(e.code).toBe("general-badRequest-validationError");
            expect(e.message).toBe("One or more validation errors occurred.");
            expect(e.description).toBe("bad request");
            expect(e.isOperational).toBe(true);
            expect.arrayContaining(e.errors);
        }
    });
    
    it('should getDefectInfoValidation fire next() function', () => {
        let req = {
            params:{
                machineId:1
            }
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.getDefectInfoValidation(req,res,next)
            expect(nextFired).toBe(true);
        } catch (e) {
            expect(e).toBe(undefined);
        }
    });
    
    it('should getDefectInfoValidation return badrequest 400 because machineId must be a number', () => {
        let req = {
            params:{
                machineId:"awdawd"
            }
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.getDefectInfoValidation(req,res,next)
            expect(nextFired).toBe(false);
        } catch (e) {
            expect(e.httpCode).toBe(400);
            expect(e.code).toBe("general-badRequest-validationError");
            expect(e.message).toBe("One or more validation errors occurred.");
            expect(e.description).toBe("bad request");
            expect(e.isOperational).toBe(true);
            expect.arrayContaining(e.errors);
            expect(e.errors[0].message).toBe('"machineId" must be a number');
        }
    });
})

describe('DefectValidation getDefectStatusValidation', () => {
    it('should getDefectStatusValidation return throw 400 badrequst type of Error', () => {
        let req = {
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.getDefectStatusValidation(req,res,next)
            expect(nextFired).toBe(false);
        } catch (e) {
            expect(e.httpCode).toBe(400);
            expect(e.code).toBe("general-badRequest");
            expect(e.message).toBe("NOT FOUND");
            expect(e.description).toBe("bad request");
            expect(e.isOperational).toBe(true);
        }
    });
    
    it('should getDefectStatusValidation return throw 400 badrequst type of Error : machineId', () => {
        let req = {
            params:{
    
            }
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.getDefectStatusValidation(req,res,next)
            expect(nextFired).toBe(false);
        } catch (e) {
            expect(e.httpCode).toBe(400);
            expect(e.code).toBe("general-badRequest-validationError");
            expect(e.message).toBe("One or more validation errors occurred.");
            expect(e.description).toBe("bad request");
            expect(e.isOperational).toBe(true);
            expect.arrayContaining(e.errors);
        }
    });
    
    it('should getDefectStatusValidation fire next() function', () => {
        let req = {
            params:{
                machineId:1
            }
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.getDefectStatusValidation(req,res,next)
            expect(nextFired).toBe(true);
        } catch (e) {
            expect(e).toBe(undefined);
        }
    });
    
    it('should getDefectStatusValidation return badrequest 400 because machineId must be a number', () => {
        let req = {
            params:{
                machineId:"awdawd"
            }
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.getDefectStatusValidation(req,res,next)
            expect(nextFired).toBe(false);
        } catch (e) {
            expect(e.httpCode).toBe(400);
            expect(e.code).toBe("general-badRequest-validationError");
            expect(e.message).toBe("One or more validation errors occurred.");
            expect(e.description).toBe("bad request");
            expect(e.isOperational).toBe(true);
            expect.arrayContaining(e.errors);
            expect(e.errors[0].message).toBe('"machineId" must be a number');
        }
    });
})

describe('DefectValidation postDefectValidation', () => {
    it('should postDefectValidation return throw 400 badrequst type of Error', () => {
        let req = {
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.postDefectValidation(req,res,next)
            expect(nextFired).toBe(false);
        } catch (e) {
            expect(e.httpCode).toBe(400);
            expect(e.code).toBe("general-badRequest");
            expect(e.message).toBe("NOT FOUND");
            expect(e.description).toBe("bad request");
            expect(e.isOperational).toBe(true);
        }
    });
    
    it('should postDefectValidation return throw 400 badrequst type of Error : machineId', () => {
        let req = {
            body:{
    
            }
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.postDefectValidation(req,res,next)
            expect(nextFired).toBe(false);
        } catch (e) {
            expect(e.httpCode).toBe(400);
            expect(e.code).toBe("general-badRequest-validationError");
            expect(e.message).toBe("One or more validation errors occurred.");
            expect(e.description).toBe("bad request");
            expect(e.isOperational).toBe(true);
            expect.arrayContaining(e.errors);
        }
    });
    
    it('should postDefectValidation fire next() function', () => {
        let req = {
            body:{
                machineId:1,
                personalNumber:"1",
                description:"abcdefg"
            }
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.postDefectValidation(req,res,next)
            expect(nextFired).toBe(true);
        } catch (e) {
            expect(e).toBe(undefined);
        }
    });
    
    it('should postDefectValidation return badrequest 400 because machineId must be a number', () => {
        let req = {
            body:{
                machineId:"awdawd",
                personalNumber:"1",
                description:"abcdefg"
            }
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.postDefectValidation(req,res,next)
            expect(nextFired).toBe(false);
        } catch (e) {
            expect(e.httpCode).toBe(400);
            expect(e.code).toBe("general-badRequest-validationError");
            expect(e.message).toBe("One or more validation errors occurred.");
            expect(e.description).toBe("bad request");
            expect(e.isOperational).toBe(true);
            expect.arrayContaining(e.errors);
            expect(e.errors[0].message).toBe('"machineId" must be a number');
        }
    });
})

describe('DefectValidation updateDefectStatusValidation', () => {
    it('should updateDefectStatusValidation return throw 400 badrequst type of Error', () => {
        let req = {
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.updateDefectStatusValidation(req,res,next)
            expect(nextFired).toBe(false);
        } catch (e) {
            expect(e.httpCode).toBe(400);
            expect(e.code).toBe("general-badRequest");
            expect(e.message).toBe("NOT FOUND");
            expect(e.description).toBe("bad request");
            expect(e.isOperational).toBe(true);
        }
    });
    
    it('should postDefectValidation return throw 400 badrequst type of Error : machineId', () => {
        let req = {
            body:{
    
            }
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.updateDefectStatusValidation(req,res,next)
            expect(nextFired).toBe(false);
        } catch (e) {
            expect(e.httpCode).toBe(400);
            expect(e.code).toBe("general-badRequest-validationError");
            expect(e.message).toBe("One or more validation errors occurred.");
            expect(e.description).toBe("bad request");
            expect(e.isOperational).toBe(true);
            expect.arrayContaining(e.errors);
        }
    });
    
    it('should updateDefectStatusValidation fire next() function', () => {
        let req = {
            body:{
                machineId:1,
                defectTime:"2021-02-26 10:31:03",
                status:1
            }
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.updateDefectStatusValidation(req,res,next)
            expect(nextFired).toBe(true);
        } catch (e) {
            expect(e).toBe(undefined);
        }
    });
    
    it('should updateDefectStatusValidation return badrequest 400 because machineId must be a number', () => {
        let req = {
            body:{
                machineId:"awdawd",
                defectTime:"2021-02-26 10:31:03",
                status:1
            }
        }
    
        let res = {
    
        }
    
        let nextFired = false;
    
        const next = function(){
            nextFired = true;
        }
    
        try {
            defectValidation.updateDefectStatusValidation(req,res,next)
            expect(nextFired).toBe(false);
        } catch (e) {
            expect(e.httpCode).toBe(400);
            expect(e.code).toBe("general-badRequest-validationError");
            expect(e.message).toBe("One or more validation errors occurred.");
            expect(e.description).toBe("bad request");
            expect(e.isOperational).toBe(true);
            expect.arrayContaining(e.errors);
            expect(e.errors[0].message).toBe('"machineId" must be a number');
        }
    });
})





