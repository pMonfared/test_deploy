#!/usr/bin/env node

/**
 * Module dependencies.
 */
 import 'babel-polyfill';
 // Setup environment
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// if NODE_ENV value not define then dev value will be assign 
const mode = process.env.NODE_ENV;

import config from 'config'

// Dependencies of App config (like: port,DbConnectionString,DbName,...)
import AppConfig from "../src/startup/appConfig.js"

//config ExpressJs App
import express from "../src/startup/express.js";

//use for write colorize message in console
import colors from "colors";

// Create server
const app = express();

const appConfig = new AppConfig(config,mode).getConfig();


// Start listening
export default app.listen(process.env.PORT || appConfig.port, function () {
    console.log(
        colors.bold(
            "Listening with " +
            process.env.NODE_ENV +
            " config on port " +
            process.env.PORT || appConfig.port
        )
    );
});

