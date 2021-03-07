import apiRoutes from "../routes/api.routes.js"

//I use a seperate file for config routes because in the future of development 
//maybe we add many api to our app and this file can be help to config and manage APIs easier 
export default function (app) {
    //ApiRoutes
    apiRoutes(app);
    
    //AdminRoutes
    //exmaple: adminRoutes(app);
};