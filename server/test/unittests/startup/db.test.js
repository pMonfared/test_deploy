import Db from '../../../src/startup/db.js'

describe("Db class generate Pool postgresql pg its",()=>{
    it("should get Error when generate instance of Db class without fill constractur params",()=>{
        try {
            let db = new Db();
        } catch (e) {
            expect(e.message).toBe("Cannot read property 'host' of undefined");
        }
        
    })

    it("should get Error 'host' when generate instance of Db class fill an empty object to constractur params",()=>{
        let configDb = {}
        
        try {
            let db = new Db(configDb);
        } catch (e) {
            expect(e.message).toBe(`host must be set to Db constructor`);
        }
        
    })

    it("should get Error 'user' when generate instance of Db class",()=>{
        let configDb = {host:'it'}
        
        try {
            let db = new Db(configDb);
        } catch (e) {
            expect(e.message).toBe(`user must be set to Db constructor`);
        }
    })

    it("should get Error 'password' when generate instance of Db class",()=>{
        let configDb = {host:'it',user:'it'}
        
        try {
            let db = new Db(configDb);
        } catch (e) {
            expect(e.message).toBe(`password must be set to Db constructor`);
        }
    })

    it("should get Error 'database' when generate instance of Db class",()=>{
        let configDb = {host:'it',user:'it',password:'it'}
        
        try {
            let db = new Db(configDb);
        } catch (e) {
            expect(e.message).toBe(`database must be set to Db constructor`);
        }
    })

    it("should get Error 'port' when generate instance of Db class",()=>{
        let configDb = {host:'it',user:'it',password:'it',database:'it'}
        
        try {
            let db = new Db(configDb);
        } catch (e) {
            expect(e.message).toBe(`port must be set to Db constructor`);
        }
    })

    it("should get a new instance of Db class",()=>{
        let configDb = {host:'it',user:'it',password:'it',database:'it',port:'it'}
        
        try {
            let db = new Db(configDb);
            expect(db).toBeDefined();
        } catch (e) {
            expect(e).toBe(null);
        }
    })
})