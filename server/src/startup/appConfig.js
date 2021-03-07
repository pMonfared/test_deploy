class AppConfig{
    constructor(configuration,mode){
        if(!configuration) {
            throw new Error('FETAL ERROR: config package is not defined for AppConfig class.');
        }
        if(!mode) {
            throw new Error('FETAL ERROR: mode is not defined for AppConfig class.');
        }
        this._config = configuration
        this._mode = mode;
    }

    getConfig () {
        const configMode = this._config.get(this._mode)
        
        if(!configMode) {
            throw new Error('FETAL ERROR: config is not defined as mode:'+ this._mode);
        }
    
        return configMode;
    };
}

export default AppConfig;