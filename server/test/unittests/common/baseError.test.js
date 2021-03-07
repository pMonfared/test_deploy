import {
    APIError,
    ExternalErrorResponse,
    HTTP400Error,
    HTTP400ValidationError,
    HTTP404Error} from '../../../src/common/baseError.js';

describe('BaseError Tests',()=>{

it('should create APIError Class', () => {
    
    let baseError = new APIError();
    
    
    expect(baseError.httpCode).toBe(500);
    expect(baseError.isOperational).toBe(true);
    expect(baseError).toBeInstanceOf(APIError)
    expect(baseError.code).toBe("general-serverError");
});

it('should create HTTP400Error Class', () => {
    
    let baseError = new HTTP400Error();
   
   
    expect(baseError.httpCode).toBe(400);
    expect(baseError.code).toBe("general-badRequest");
    expect(baseError).toBeInstanceOf(HTTP400Error)
    expect(baseError.isOperational).toBe(true);
});

it('should create HTTP400Error Class with specific params', () => {
   
   
    let baseError = new HTTP400Error("tst-1","tst-msg-1","tst-description-1");
   
   
    expect(baseError.httpCode).toBe(400);
    expect(baseError.code).toBe("tst-1");
    expect(baseError.message).toBe("tst-msg-1");
    expect(baseError.description).toBe("tst-description-1");
    expect(baseError).toBeInstanceOf(HTTP400Error)
    expect(baseError.isOperational).toBe(true);
});

it('should create HTTP404Error Class without assign specific params to constructor', () => {
    
    
    let baseError = new HTTP404Error();
   
   
    expect(baseError.httpCode).toBe(404);
    expect(baseError.code).toBe("general-notFound");
    expect(baseError.message).toBe("NOT FOUND");
    expect(baseError.description).toBe("The item(s) does not exist");
    expect(baseError).toBeInstanceOf(HTTP404Error)
    expect(baseError.isOperational).toBe(true);
});

it('should create HTTP404Error Class with specific params', () => {
    
    
    let baseError = new HTTP404Error("tst-1","tst-msg-1","tst-description-1");
   
   
    expect(baseError.httpCode).toBe(404);
    expect(baseError.code).toBe("tst-1");
    expect(baseError.message).toBe("tst-msg-1");
    expect(baseError.description).toBe("tst-description-1");
    expect(baseError).toBeInstanceOf(HTTP404Error)
    expect(baseError.isOperational).toBe(true);
});

it('should create HTTP400ValidationError Class with default values and errors param must be empty array', () => {
    
    
    let baseError = new HTTP400ValidationError();
    
    
    expect(baseError.httpCode).toBe(400);
    expect(baseError.code).toBe("general-badRequest-validationError");
    expect(baseError.message).toBe("One or more validation errors occurred.");
    expect(baseError.description).toBe("bad request");
    expect(baseError.isOperational).toBe(true);
    expect(baseError).toBeInstanceOf(HTTP400ValidationError)
    expect.arrayContaining(baseError.errors);
});

it('should create HTTP400ValidationError Class with default values but assigned only errors params', () => {
    
    let errors = [{"username":"it is requirement"}];
    
    
    let baseError = new HTTP400ValidationError(errors);
    
    
    expect(baseError.httpCode).toBe(400);
    expect(baseError.code).toBe("general-badRequest-validationError");
    expect(baseError.message).toBe("One or more validation errors occurred.");
    expect(baseError.description).toBe("bad request");
    expect(baseError.isOperational).toBe(true);
    expect(baseError).toBeInstanceOf(HTTP400ValidationError)
    expect(baseError.errors).toBe(errors);
});

it('should create HTTP400ValidationError Class with all specific params', () => {
    let errors = [{"username":"it is requirement"}];
    
    let baseError = new HTTP400ValidationError(errors,"tst-1","tst-msg-1","tst-description-1");
    
    expect(baseError.code).toBe("tst-1");
    expect(baseError.message).toBe("tst-msg-1");
    expect(baseError.description).toBe("tst-description-1");
    expect(baseError.isOperational).toBe(true);
    expect(baseError).toBeInstanceOf(HTTP400ValidationError)
    expect.arrayContaining(baseError.errors)
});

it('should create ExternalErrorResponse Class with all specific params', () => {

    let errors = [{"username":"it is requirement"}];
    let baseError = new HTTP400ValidationError(errors,"tst-1","tst-msg-1","tst-description-1");
    

    let responseModel = new ExternalErrorResponse(baseError);
    
    expect(responseModel.code).toBe("tst-1");
    expect(responseModel.message).toBe("tst-msg-1");
    expect(responseModel.description).toBe("tst-description-1");
    expect(responseModel.isOperational).toBe(true);
    expect(responseModel).toBeInstanceOf(ExternalErrorResponse)
    expect.arrayContaining(responseModel.errors)
});

it('should create ExternalErrorResponse Class without errors param', () => {
    let baseError = new HTTP400ValidationError(undefined,"tst-1","tst-msg-1","tst-description-1");

    let responseModel = new ExternalErrorResponse(baseError);
    
    expect(responseModel.code).toBe("tst-1");
    expect(responseModel.message).toBe("tst-msg-1");
    expect(responseModel.description).toBe("tst-description-1");
    expect(responseModel.isOperational).toBe(true);
    expect(responseModel).toBeInstanceOf(ExternalErrorResponse)
    expect(responseModel.errors).toBe(undefined);
});

})