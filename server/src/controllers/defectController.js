import {APIError} from '../common/baseError.js';


class DefectController {
    //must inject DefectService to constructor
    constructor(service) {
      //private props begin
      this._service = service;
      //private props end
      
      //public props begin
      this.getAllAsync = this.getAllAsync.bind(this);
      this.getInfoAsync = this.getInfoAsync.bind(this);
      this.getStatusAsync = this.getStatusAsync.bind(this);
      this.insertInfoAsync = this.insertInfoAsync.bind(this);
      this.updateStatusAsync = this.updateStatusAsync.bind(this);
      //public props end
    }
  
    async getAllAsync(req, res, next) {
        try {
            return res.status(200).send(await this._service.getAllAsync());
        } catch (error) {
            //we designed a custom Error extended by javascript Error if fire a handled Error just return it
            //to exceptionHandler middleware by next() to manage as central error handler
            //else exception is a unhandled,should generate another custom error (APIError(unhandledError,...)) to log real error 
            //to logfile and only show user-friendly message in response
            next(error.isOperational ? error : new APIError(error,"postDefect-ct","Cannot Add Defect Info"));
        }
    }
  
    async getInfoAsync(req, res, next) {
        try {
            //get routes params from request.params
            const { machineId } = req.params;
            return res.status(200).send(await this._service.getInfoAsync(machineId));
        } catch (error) {
            //we designed a custom Error extended by javascript Error if fire a handled Error just return it
            //to exceptionHandler middleware by next() to manage as central error handler
            //else exception is a unhandled,should generate another custom error (APIError(unhandledError,...)) to log real error 
            //to logfile and only show user-friendly message in response
            next(error.isOperational ? error : new APIError(error,"getDefectInfo-ct","Cannot Fetch Defect Info"));
        }
      
    }

    async getStatusAsync(req, res, next) {
        //get routes params from request.params
        const { machineId } = req.params;
        try {
            //call service function and return data as logic flow designed
            //shoud return 200 for successfull new save data operation with/out data
            return res.status(200).send(await this._service.getStatusAsync(machineId));
        } catch (error) {
            //we designed a custom Error extended by javascript Error if fire a handled Error just return it
            //to exceptionHandler middleware by next() to manage as central error handler
            //else exception is a unhandled,should generate another custom error (APIError(unhandledError,...)) to log real error 
            //to logfile and only show user-friendly message in response
            next(error.isOperational ? error : new APIError(error,"getStatusAsync-ct","Cannot Get Defect Status"));
        }
    }
  
    async insertInfoAsync(req, res, next) {
        try {
            //call service function and return data as logic flow designed
            //shoud return 201 for successfull new save data operation with/out data
            return res.status(201).send(await this._service.insertInfoAsync(req.body));
        } catch (error) {
            //we designed a custom Error extended by javascript Error if fire a handled Error just return it
            //to exceptionHandler middleware by next() to manage as central error handler
            //else exception is a unhandled,should generate another custom error (APIError(unhandledError,...)) to log real error 
            //to logfile and only show user-friendly message in response
            next(error.isOperational ? error : new APIError(error,"insertDefectInfo-ct","Cannot Add New Defect Info"));
        }
    }

    async updateStatusAsync(req, res, next) {
        try {
            //call service function and return data as logic flow designed
            //shoud return 200 for successfull operation with/out data
            return res.status(200).send(await this._service.updateStatusAsync(req.body));
        } catch (error) {
            //we designed a custom Error extended by javascript Error if fire a handled Error just return it
            //to exceptionHandler middleware by next() to manage as central error handler
            //else exception is a unhandled,should generate another custom error (APIError(unhandledError,...)) to log real error 
            //to logfile and only show user-friendly message in response
            next(error.isOperational ? error : new APIError(error,"updateDefectStatus-ct","Cannot update Defect Status"));
        }
      }
    
  }
  
export default DefectController;

