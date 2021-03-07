import logger from './../startup/logger.js'
import {ExternalErrorResponse} from '../common/baseError.js'


//we designed a custom Error extended by javascript Error if fire a handled Error just return it
//to exceptionHandler middleware by next() to manage as central error handler
//else exception is a unhandled,should generate another custom error (APIError(unhandledError,...)) to log real error 
//to logfile and only show user-friendly message in response
export default function(err, req, res, next) {
    //log with winston libary to console
    logger.error(err.message, err);
    return res.status(err?.httpCode ?? 500).send(new ExternalErrorResponse(err));
};