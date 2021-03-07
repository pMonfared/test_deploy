// Types of Errors in Node.js
// First of all, it is necessary to have a clear understanding of errors in Node.js. In general,
// Node.js errors are divided into two distinct categories: operational errors and programmer errors.
//
//     Operational errors represent runtime problems whose results are expected and should be dealt with in a proper way.
//     Operational errors don’t mean the application itself has bugs, but developers need to handle them thoughtfully. 
//     Examples of operational errors include “out of memory,” “an invalid input for an API endpoint,” and so on.

//     Programmer errors represent unexpected bugs in poorly written code. 
//     They mean the code itself has some issues to solve and was coded wrong.
//     A good example is to try to read a property of “undefined.” To fix the issue, the code has to be changed.
//     That is a bugs a developer made, not an operational error.


//BaseError is a customError class extended as javaScript Error to show a better error detail in response
//code prop is a specific value of each operational exception
export class BaseError extends Error {
    constructor(code, message,  description, httpCode, isOperational, internalError = "nothing found") {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
        this.message = message;
        this.code = code;
        this.description = description;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.internalError = internalError;

        Error.captureStackTrace(this);
    }
}

export class ExternalErrorResponse{
    constructor(errorModel){
        this.message = errorModel.message;
        this.code = errorModel.code;
        this.description = errorModel.description;
        this.httpCode = errorModel.httpCode;
        this.isOperational = errorModel.isOperational;
        if(errorModel.errors && errorModel.errors.length > 0){
            this.errors = errorModel.errors;
        }
    }
}

//free to extend the BaseError
export class APIError extends BaseError {
    constructor(internalError= {}, code= "general-serverError", message = "ServerError", description = 'internal server error', isOperational = true, httpCode = HttpStatusCode.INTERNAL_SERVER  ) {
        super(code, message, description, httpCode, isOperational,internalError);
    }
}

export class HTTP400Error extends BaseError {
    constructor(code = "general-badRequest" , message = 'NOT FOUND', description = 'bad request') {
        super(code, message, description, HttpStatusCode.BAD_REQUEST, true);
    }
}

//generate 400 badRequest with validation errors message key/value 
export class HTTP400ValidationError extends BaseError {
    constructor(errors = [],code = "general-badRequest-validationError" , message = 'One or more validation errors occurred.', description = 'bad request') {
        super(code, message, description, HttpStatusCode.BAD_REQUEST, true);
        this.errors = errors;
    }
}

export class HTTP404Error extends BaseError {
    constructor(code = "general-notFound" , message = 'NOT FOUND', description = 'The item(s) does not exist') {
        super(code, message, description, HttpStatusCode.NOT_FOUND, true);
    }
}

const HttpStatusCode = {
    OK : 200,
    BAD_REQUEST : 400,
    NOT_FOUND : 404,
    INTERNAL_SERVER : 500,
}

