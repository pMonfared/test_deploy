import defectApiRoutesV1 from "./api_v1/defectRoutes.js";
import apiVersions from "../constants/ApiVersions.js";
//get static value of API versions 1,2,... depend on development discuss : like we want up to new level of API version and also should support old versions
const apiV1 = apiVersions.API_VERSIONS.find(v => v.version === 1);

export default function (app) {
    //Routes of defect controller : api/v1/defect (GET,POST,PUT,PATCH,DELETE)
    app.use(`${apiV1.prefixUri}/defect`, defectApiRoutesV1);
};