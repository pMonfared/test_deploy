import Joi from "@hapi/joi";
import { HTTP400Error, HTTP400ValidationError } from "../../common/baseError.js"

//all validation function for defect incoming request by Joi npm library (Joi is a validation library)
class DefectRoutesValidations {
    //valid request.body/params/query before fire controller function(s)
    getDefectInfoValidation(req, res, next) {
        const schema = Joi.object({
            machineId: Joi.number().required()
        });

        //check request not be undefined
        if(!req || !req.params){
            throw new HTTP400Error();
        }

        const { error } = schema.validate(req.params);
        //if there is any error should throw a http badRequest response and add joi error detail to response data 
        if (error) throw new HTTP400ValidationError(error.details);

        next();
    }
    //valid request.body/params/query before fire controller function(s)
    getDefectStatusValidation(req, res, next) {
        const schema = Joi.object({
            machineId: Joi.number().required()
        });

        //check request not be undefined
        if(!req || !req.params){
            throw new HTTP400Error();
        }

        const { error } = schema.validate(req.params);
        //if there is any error should throw a http badRequest response and add joi error detail to response data 
        if (error) throw new HTTP400ValidationError(error.details);

        next();
    }
    //valid request.body/params/query before fire controller function(s)
    postDefectValidation(req, res, next) {
        const schema = Joi.object({
            machineId: Joi.number().required(),
            personalNumber: Joi.string().required(), 
            description: Joi.string().min(5).max(500).required()
        });

        //check request not be undefined
        if(!req || !req.body){
            throw new HTTP400Error();
        }

        const { error } = schema.validate(req.body);
        //if there is any error should throw a http badRequest response and add joi error detail to response data 
        if (error) throw new HTTP400ValidationError(error.details);

        next();
    }
    //valid request.body/params/query before fire controller function(s)
    updateDefectStatusValidation(req, res, next) {
        const schema = Joi.object({
            machineId: Joi.number().required(),
            defectTime: Joi.date().iso(),
            status: Joi.number().required(),
        });

        //check request not be undefined
        if(!req || !req.body){
            throw new HTTP400Error();
        }

        const { error } = schema.validate(req.body);
        //if there is any error should throw a http badRequest response and add joi error detail to response data 
        if (error) throw new HTTP400ValidationError(error.details);

        next();
    }
}

export default DefectRoutesValidations






