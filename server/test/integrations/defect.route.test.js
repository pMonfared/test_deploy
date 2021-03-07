import server from '../../bin/www.js';
import { expect } from 'chai';
import request from 'supertest';


describe('Get Defect API Routes Tests', async () => {
    beforeEach(async () => { 
        
    });
    afterEach(async () => {
      await server.close();
      uriAddress ="/api/v1/defect";
      body={};
    });

    let body = {}
    let uriAddress ="/api/v1/defect";
    
    const execGet = () => {
        return request(server)
            .get(uriAddress)
    };

    const execPost = () => {
        return request(server)
            .post(uriAddress).send(body);
    };

    it('it should POST a defect', async () => {
        body = {
            "machineId":2,
            "personalNumber":"1",
            "description":"this is bad situation about this machine"
        }
        
        const res = await execPost();

        expect(res.status).to.equal(201);
    });

    it('it should POST a defect/status', async () => {
        uriAddress = "/api/v1/defect/status"
        
        body = {
            "machineId":1,
            "defectTime":"2021-02-26 10:31:03",
            "status":3
        }

        const res = await execPost();

        expect(res.status).to.equal(200);
    });
    
    it('it should GET all the defects', async () => {
      const res = await execGet();

      expect(res.status).to.equal(200);
    });

    it('it should GET error 404 url notfound', async () => {
      uriAddress = "/api/v1/defectsawdawd"
      const res = await execGet();

      expect(res.status).to.equal(404);
    });

    it('it should GET error 404 url notfound - 2', async () => {
      uriAddress = "/api/v1/"
      const res = await execGet();

      expect(res.status).to.equal(404);
    });

    it('it should GET defects by machineId', async () => {
      const machineId = 1
      uriAddress = "/api/v1/defect/" + machineId
      const res = await execGet();

      
      expect(res.status).to.equal(200);
    });

    it('it should GET defects array by machineId', async () => {
      const machineId = 1
      uriAddress = "/api/v1/defect/" + machineId
      const res = await execGet();

      expect(res.status).to.equal(200);
    });

    it('it should GET error the machine does not exist 400', async () => {
      const machineId = 2898494
      uriAddress = "/api/v1/defect/" + machineId
      const res = await execGet();

      expect(res.status).to.equal(400);
    });


    it('it should GET error the machine does not exist 400', async () => {
        const machineId = 2898494
        uriAddress = "/api/v1/defect/" + machineId
        const res = await execGet();

        expect(res.status).to.equal(400);
    });

    

});

