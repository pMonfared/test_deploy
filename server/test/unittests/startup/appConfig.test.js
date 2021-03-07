import AppConfig from "../../../src/startup/appConfig.js"

describe("AppConfig class generate tests",()=>{
    
    it("should return Error 'configuration' when generate an instance of AppConfig class",()=>{
        try {
            let appConfig = new AppConfig();
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toBe('FETAL ERROR: config package is not defined for AppConfig class.');
        }

    })

    it("should return Error 'mode' when generate an instance of AppConfig class",()=>{
        try {
            let appConfig = new AppConfig('test-configuration');
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toBe('FETAL ERROR: mode is not defined for AppConfig class.');
        }
    })

    it("should return an instance of AppConfig class",()=>{
        try {
            let appConfig = new AppConfig('test-configuration','test-mode');
            expect(appConfig).toBeDefined();
        } catch (e) {
            expect(e).toBeDefined();
            expect(e).toBe(null);
        }
    })

    it("should return config enviroments with an instance of AppConfig class by fire getConfig function",()=>{
        let configuration = {
            get(mode){
                return {
                    mode,
                    database: {
                        host:'test-host'
                    }
                }
            }
        }
        
        try {
            let appConfig = new AppConfig(configuration,'development');
            expect(appConfig).toBeDefined();

            let tstCf = configuration.get('development');
            let devConfig = appConfig.getConfig();
            expect(devConfig).toBeDefined();
            expect(devConfig).toStrictEqual(tstCf);
        } catch (e) {
            expect(e).toBeDefined();
            expect(e).toBe(null);
        }
    })

    it("should return Error 'mode' when generate an instance of AppConfig class by fire getConfig function",()=>{
        let mode = 'development'
        
        let configuration = {
            get(mode){
                return null
            }
        }
        
        try {
            let appConfig = new AppConfig(configuration,mode);
            expect(appConfig).toBeDefined();

            let tstCf = configuration.get(mode);
            let devConfig = appConfig.getConfig();
            expect(devConfig).toBeDefined();
            expect(devConfig).toStrictEqual(tstCf);
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toBe('FETAL ERROR: config is not defined as mode:'+ mode);
        }
    })
})