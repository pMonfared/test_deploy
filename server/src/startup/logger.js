import winston from "winston";

//I choice winston as logger library with many features to config
const logger = (winston.createLogger)({
    transports: [
        //set console logger and it's colorized all text in console based on colors array
        new (winston.transports.Console)({
            format: winston.format.combine(
                // label({ label: 'right meow!' }),
                winston.format.timestamp(),
                winston.format.prettyPrint(),
                winston.format.colorize({
                    all:true,
                    colors: { info: 'green', error: 'red' }
                })
            ),
            handleExceptions: true
        }),
        //save debug logs to debug.log in logs folder 
        new (winston.transports.File)({
            level: 'debug',
            filename: 'logs/debug.log',
            format: winston.format.combine(
                // label({ label: 'right meow!' }),
                winston.format.timestamp(),
                winston.format.prettyPrint()
            ),
            tailable: true,
        }),
        //save info logs to info.log in logs folder 
        new (winston.transports.File)({
            level: 'info',
            filename: 'logs/info.log',
            format: winston.format.combine(
                // label({ label: 'right meow!' }),
                winston.format.timestamp(),
                winston.format.prettyPrint()
            ),
            tailable: true,
        }),
        //save error logs to error.log in logs folder 
        new (winston.transports.File)({
            level: 'error',
            filename: 'logs/error.log',
            format: winston.format.combine(
                // label({ label: 'right meow!' }),
                winston.format.timestamp(),
                winston.format.prettyPrint()
            ),
            tailable: true,
        })
    ]
});

export default logger;