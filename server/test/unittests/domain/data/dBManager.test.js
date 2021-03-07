import "babel-polyfill"
import MockDbManager from "../../../setup/mockDbManager.js";
import DBManager from "../../../../src/domain/data/dBManager.js";

describe('dbManager.it', async () => {
    let pool;
    let rows;
    beforeEach(() => {
        pool = {}
        rows = [];
    })
    afterEach(() => {
        pool = {}
        rows = [];
    })

    it('should DbManager return exception when is not set pool to constructor', async () => {
        rows = [{total:0}]

        try {
            const dbMg = new DBManager(null);
            expect(dbMg).toBe(null);
        } catch (e){
            expect(e).toBeDefined();
            expect(e.message).toBe("pool of pg (postgresql) must be set to DBManager constructor");
        }

    });

    it('should mockDbManager return exception when is not set pool to constructor', async () => {
        rows = [{total:0}]
        
        try {
            const dbMg = new MockDbManager(null,rows);
            expect(dbMg).toBe(null);
        } catch (e){
            expect(e).toBeDefined();
            expect(e.message).toBe("pool of pg (postgresql) must be set to DBManager constructor");
        }
        
    });

    it('should countRecord return rows,rowCount,sqlQuery', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);
        
        const result = await dbMg.countRecord("it");
        expect(result).toBeDefined();
        expect(result.rowCount).toBe(1);
        expect(result.sqlQry).toBe("SELECT COUNT(*) as total FROM it");
        expect(result.rows).toBe(rows);
    });

    it('should countRecord return rows,rowCount,sqlQuery with where conditions 1', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.countRecord("it",{machine_id:1});
        
        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("SELECT COUNT(*) as total FROM it WHERE (machine_id = 1)");
    });

    it('should countRecord return rows,rowCount,sqlQuery with where conditions AND', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.countRecord("it",{machine_id:1,status:3});
        
        
        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("SELECT COUNT(*) as total FROM it WHERE (machine_id = 1 AND status = 3)");
    });

    it('should countRecord return rows,rowCount,sqlQuery with where conditions OR', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.countRecord("it",{machine_id:1,status:3},"OR");
        
        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("SELECT COUNT(*) as total FROM it WHERE (machine_id = 1 OR status = 3)");
    });

    it('should dataInsert return rows,rowCount,sqlQuery', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.dataInsert("it",{machine_id:1,status:3});
        
        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("INSERT INTO it (machine_id,status) values (1,3)  RETURNING *");
    });

    it('should dataUpdate return rows,rowCount,sqlQuery', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.dataUpdate("it",{machine_id:1,status:3,personal_number:"12"});

        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("UPDATE it SET machine_id = 1,status = 3,personal_number = '12'");
    });

    it('should dataUpdate return rows,rowCount,sqlQuery with where condition', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.dataUpdate("it",{status:3,personal_number:"12"},{machine_id:1});

        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("UPDATE it SET status = 3,personal_number = '12' WHERE machine_id = 1");
    });

    it('should dataUpdate return rows,rowCount,sqlQuery with where conditions with AND', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.dataUpdate("it",{personal_number:"12"},{machine_id:1,status:2});

        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("UPDATE it SET personal_number = '12' WHERE machine_id = 1 AND status = 2");
    });

    it('should dataUpdate return rows,rowCount,sqlQuery with where conditions with OR', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.dataUpdate("it",{personal_number:"12"},{machine_id:1,status:2,defect_time:"22"},"OR");

        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("UPDATE it SET personal_number = '12' WHERE machine_id = 1 OR status = 2 OR defect_time = '22'");
    });

    it('should getData return rows,rowCount,sqlQuery with all fields, where conditions with OR', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.getData("it","*",{machine_id:1,status:2,defect_time:"22"},"OR");

        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("SELECT * FROM it WHERE (machine_id = 1 OR status = 2 OR defect_time = '22')");
    });

    it('should getData return rows,rowCount,sqlQuery with selected fields, where conditions with AND', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.getData("it","machineId, status",{machine_id:1,status:2,defect_time:"22"},"AND");

        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("SELECT machineId, status FROM it WHERE (machine_id = 1 AND status = 2 AND defect_time = '22')");
    });

    it('should getData return rows,rowCount,sqlQuery with selected fields, where conditions with AND with limit and offset', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.getData("it","machineId, status",{machine_id:1,status:2,defect_time:"22"},"AND", 10,2);

        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("SELECT machineId, status FROM it WHERE (machine_id = 1 AND status = 2 AND defect_time = '22') OFFSET 10 LIMIT 2 ");
    });

    it('should getData return rows,rowCount,sqlQuery with selected fields, where conditions with AND with limit and offset and order', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.getData("it","machineId, status",{machine_id:1,status:2,defect_time:"22"},
            "AND", 10,2," ORDER BY status ASC");

        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("SELECT machineId, status FROM it WHERE (machine_id = 1 AND status = 2 AND defect_time = '22')  ORDER BY status ASC  OFFSET 10 LIMIT 2 ");
    });


    it('should getJoinedData return rows,rowCount,sqlQuery with where conditions', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.getJoinedData("it","worker_registry","personal_number",
            "personal_number","defect.*,worker_registry.name as worker_registry_name",{status: 1});

        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("SELECT defect.*,worker_registry.name as worker_registry_name FROM it JOIN worker_registry ON it.personal_number = worker_registry.personal_number WHERE (status = 1)");
    });

    it('should getJoinedData return rows,rowCount,sqlQuery with where conditions with limit and offset', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.getJoinedData("it","worker_registry","personal_number",
            "personal_number","defect.*,worker_registry.name as worker_registry_name",{status: 1},
            "OR",10,5);

        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("SELECT defect.*,worker_registry.name as worker_registry_name FROM it JOIN worker_registry ON it.personal_number = worker_registry.personal_number WHERE (status = 1) OFFSET 10 LIMIT 5");
    });

    it('should getJoinedData return rows,rowCount,sqlQuery with where conditions with limit and offset and order', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.getJoinedData("it","worker_registry","personal_number",
            "personal_number","defect.*,worker_registry.name as worker_registry_name",{status: 1},
            "OR",10,5,""," ORDER BY status ASC");

        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("SELECT defect.*,worker_registry.name as worker_registry_name FROM it JOIN worker_registry ON it.personal_number = worker_registry.personal_number WHERE (status = 1)  ORDER BY status ASC  OFFSET 10 LIMIT 5");
    });

    it('should getJoinedData return rows,rowCount,sqlQuery with where conditions with limit and offset and order and customerSQLWhere', async () => {
        rows = [{total:0}]
        const dbMg = new MockDbManager(pool,rows);

        const result = await dbMg.getJoinedData("it","worker_registry","personal_number",
            "personal_number","defect.*,worker_registry.name as worker_registry_name",{status: 1},
            "OR",10,5,"personal_number = '12'"," ORDER BY status ASC");

        expect(result).toBeDefined();
        expect(result.sqlQry).toBe("SELECT defect.*,worker_registry.name as worker_registry_name FROM it JOIN worker_registry ON it.personal_number = worker_registry.personal_number WHERE (status = 1) AND personal_number = '12'  ORDER BY status ASC  OFFSET 10 LIMIT 5");
    });
});