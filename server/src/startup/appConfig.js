class AppConfig{
    constructor(configuration){
        if(!configuration) {
            throw new Error('FETAL ERROR: config package is not defined for AppConfig class.');
        }
        
        this._config = configuration
    }
    getConfig (keyName) {
        if(!keyName) {
            throw new Error('FETAL ERROR: keyName is not defined for getConfig function.');
        }
        
        const configValue = this._config.get(keyName)
        
        if(!configValue) {
            throw new Error('FETAL ERROR: config value is not defined as key-name:'+ keyName);
        }
    
        return configValue;
    };
}

export default AppConfig;