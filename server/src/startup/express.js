// if NODE_ENV value not define then dev value will be assign 
const mode = process.env.NODE_ENV || 'development';

// Dependencies of App config (like: port,DbConnectionString,DbName,...)
import AppConfig from "./appConfig.js"

//all Routes configs
import routes from "./routes.js";

import express from "express";

import bodyParser from "body-parser";

import config from 'config'

//Central Exception Handler as middleware
import error from "../middlewares/errorResponseHandler.js";

const initApp = function () {
  const appConfig = new AppConfig(config,mode).getConfig();
  
  // Init express config
  let app = express();
  //Express advance config
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));

  // set app port from Config file
  app.set("port", appConfig.PORT);

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(bodyParser.json());

  // Setup routes
  routes(app);

  //Error middleware
  app.use(error);
  

  return app;
};

export default initApp;
