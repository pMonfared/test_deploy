import Db from '../../../src/startup/db.js'

describe("Db class generate Pool postgresql pg its",()=>{
    it("should get Error when generate instance of Db class without fill constractur params",()=>{
        try {
            let db = new Db();
        } catch (e) {
            expect(e.message).toBe("Cannot read property 'connectionString' of undefined");
        }
        
    })

    it("should get Error 'host' when generate instance of Db class fill an empty object to constractur params",()=>{
        let configDb = {}
        
        try {
            let db = new Db(configDb);
        } catch (e) {
            expect(e.message).toBe(`connectionString must be set to Db constructor`);
        }
        
    })


    it("should get a new instance of Db class",()=>{
        let configDb = {connectionString:'test'}
        
        try {
            let db = new Db(configDb);
            expect(db).toBeDefined();
        } catch (e) {
            expect(e).toBe(null);
        }
    })
})