
import DBManager from "../../src/domain/data/dBManager.js";

//a customize Mocking class to communication with postgresql db by 'pg' npm package
class MockDbManager extends DBManager{
    constructor(pool,rows = []) {
        super(pool)
        this.rows = rows;
        this.dataInsert = this.dataInsert.bind(this);
        this.dataUpdate = this.dataUpdate.bind(this);
        this.getData = this.getData.bind(this);
        this.dataDelete = this.dataDelete.bind(this);
        this.getJoinedData = this.getJoinedData.bind(this);
        this.getLimitData = this.getLimitData.bind(this);
        this.countRecord = this.countRecord.bind(this);
    }
    //connect to db and run query like: insert,update,delete,fetchAll,fetchOne
    async runQuery(sqlQry) {
        try {
            return {
                rowCount: this.rows ? this.rows.length : 0,
                rows:this.rows,
                sqlQry
            }
        } catch (error) {
            throw error;
        } finally {
            
        }
    }

}

export default MockDbManager;