#!/usr/bin/env node

/**
 * Module dependencies.
 */
 import 'babel-polyfill';


import config from 'config'

// Dependencies of App config (like: port,DbConnectionString,DbName,...)
import AppConfig from "../src/startup/appConfig.js"

//config ExpressJs App
import express from "../src/startup/express.js";

//use for write colorize message in console
import colors from "colors";

// Create server
const app = express();

const appConfigPort = new AppConfig(config).getConfig("port");


// Start listening
export default app.listen(appConfigPort, function () {
    console.log(
        colors.bold(
            "Listening with " +
            process.env.NODE_ENV +
            " config on port " +
            appConfigPort
        )
    );
});

