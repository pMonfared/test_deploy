import express from "express";

import config from 'config'


//#region wire up db,repositories,services,controllers,routesValidations
//get config of current ENV mode like :dev,staging,production
import AppConfig from "../../startup/appConfig.js";

const appConfigDatabase = new AppConfig(config).getConfig("database");

//generate new pool of postgresql db connection by pg npm package
import Db from "../../startup/db.js"

const db = new Db(appConfigDatabase)

//Db manager Class BEGIN
import DBManager from "../../domain/data/dBManager.js"
//Db manager Class END

//DataLayer Repositories BEGIN
import DefectRepository from "../../domain/repositories/defectRepository.js";
import MachineRepository from "../../domain/repositories/machineRepository.js";
import WorkerRegistryRepository from "../../domain/repositories/workerRegistryRepository.js";
//DataLayer Repositories END

//Routes Validation Middlewares BEGIN
import DefectRoutesValidation from "../validations/defectRoutesValidation.js";
//Routes Validation Middlewares END

//PresentationLayer Services BEGIN
import DefectServices from "../../presentation/services/defectServices.js"
//PresentationLayer Services END

//Controllers BEGIN
import DefectController from "../../controllers/defectController.js";
//Controllers END

//
const dBManager = new DBManager(db.generatePool());

//generate new repositories class
const defectRepository = new DefectRepository(dBManager);
const machineRepository = new MachineRepository(dBManager);
const workerRegistryRepository = new WorkerRegistryRepository(dBManager);

//generate new services class and inject repositories into constructor
const defectServices = new DefectServices(machineRepository,defectRepository,workerRegistryRepository);

//generate new controller class and inject services into constructor
const defectController = new DefectController(defectServices);

const allValidation = new DefectRoutesValidation();
//#endregion

const router = express.Router();
//Routes of defect controller : example (GET,POST,PUT,PATCH,DELETE)
//We use validation as a middleware to validate incoming params,query,body of request and throw exception if need it
router.get('/', defectController.getAllAsync);
router.get('/:machineId', [allValidation.getDefectInfoValidation], defectController.getInfoAsync);
router.get('/:machineId/status', [allValidation.getDefectStatusValidation], defectController.getStatusAsync);
router.post('/', [allValidation.postDefectValidation], defectController.insertInfoAsync);
router.post('/status', [allValidation.updateDefectStatusValidation], defectController.updateStatusAsync);


export default router;
