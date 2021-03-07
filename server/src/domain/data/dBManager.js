//a customize class to communication with postgresql db by 'pg' npm package
class DBManager {
    constructor(pool) {
        if(!pool)
            throw new Error(`pool of pg (postgresql) must be set to DBManager constructor`);
        
        //private props start with => _
        this._pool = pool;
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
        //get detail from config file to generate a connection to database
        const client = await this._pool.connect();

        try {
            return await client.query(sqlQry);
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    //insert row to a specific table
    async dataInsert(tableName, value) {

        //separate keys title like row name in table
        const fields = Object.keys(value)
            .map((key) => `${key}`)
            .join(",");
        //separate values like '1' or 'Pooria' in table
        const values = Object.values(value)
            .map((value) => {
                return typeof value === "string" ? `'${value}'` : `${value}`;
            })
            .join(",");

        //generate insert sql query 
        let sqlQry =
            "INSERT INTO " + tableName + " (" + fields + ") values (" + values + ")  RETURNING *";

        //call runQuery function and connect to Db and run query
        return new Promise((resolve, reject) => {
            this.runQuery(sqlQry)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    //update row(s) with where conditions and/or
    async dataUpdate(tableName, dataObj, whereObj = {}, condition = "AND") {

        const fieldsName = Object.keys(dataObj)
            .map(function (key, index) {
                let value =
                    typeof dataObj[key] === "string"
                        ? `'${dataObj[key]}'`
                        : `${dataObj[key]}`;
                return `${key} = ${value}`;
            })
            .join(",");

        //generate where coditions by analyize Object key/value and generate as looping like > id = 1  
        const whereQry = Object.keys(whereObj)
            .map(function (key, index) {
                let value =
                    typeof whereObj[key] === "string"
                        ? `'${whereObj[key]}'`
                        : `${whereObj[key]}`;
                return `${key} = ${value}`;
            })
            .join(" " + condition + " ");

        //generate update sql query 
        let sqlQry = "UPDATE " + tableName + " SET " + fieldsName;
        
        //append conditions if exist
        if (Object.keys(whereObj).length > 0) {
            sqlQry += " WHERE " + whereQry;
        }

        //call runQuery function and connect to Db and run query
        return new Promise((resolve, reject) => {
            this.runQuery(sqlQry)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    //get data with custom param like: tableName, also function is ready to fetch for pagination requests optionally and use conditions
    async getData(
        tableName,
        fieldsObj = "*",
        whereObj = {},
        condition = "AND",
        offset = -1,
        limit = -1,
        orderBy = ""
    ) {
        const whereQry = Object.keys(whereObj)
            .map(function (key, index) {
                let value =
                    typeof whereObj[key] === "string"
                        ? `'${whereObj[key]}'`
                        : `${whereObj[key]}`;
                return `${key} = ${value}`;
            })
            .join(" " + condition + " ");

        let sqlQry = "SELECT " + fieldsObj + " FROM " + tableName;
        if (Object.keys(whereObj).length > 0) {
            sqlQry += " WHERE (" + whereQry + ")";
        }

        if (orderBy !== '') {
            sqlQry += ` ${orderBy} `;
        }
        
        if (offset >= 0 && limit >= 0) {
            sqlQry += ` OFFSET ${offset} LIMIT ${limit} `;
        }

        return new Promise((resolve, reject) => {
            this.runQuery(sqlQry)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    //delete row(s) with where conditions and/or
    async dataDelete(tableName, whereObj = {}, condition = "AND") {
        const whereQry = Object.keys(whereObj)
            .map(function (key, index) {
                let value =
                    typeof whereObj[key] === "string"
                        ? `'${whereObj[key]}'`
                        : `${whereObj[key]}`;
                return `${key} = ${value}`;
            })
            .join(" " + condition + " ");

        let sqlQry = "DELETE  " + tableName;
        if (Object.keys(whereObj).length > 0) {
            sqlQry += " WHERE " + whereQry;
        }
        return new Promise((resolve, reject) => {
            this.runQuery(sqlQry)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    //get rows by join 2 table with where conditions and/or
    async getJoinedData(
        tableName1,
        tableName2,
        table1ColumnName,
        table2ColumnName,
        fieldsObj = "*",
        whereObj = {},
        condition = "AND",
        offset = -1,
        limit = -1,
        customSqlWhere = "",
        orderBy = ""
    ) {
        const whereQry = Object.keys(whereObj)
            .map(function (key, index) {
                let value =
                    typeof whereObj[key] === "string"
                        ? `'${whereObj[key]}'`
                        : `${whereObj[key]}`;
                return `${key} = ${value}`;
            })
            .join(" " + condition + " ");

        let sqlQry =
            "SELECT " +
            fieldsObj +
            " FROM " +
            tableName1 +
            " JOIN " +
            tableName2 +
            " ON " +
            `${tableName1}.${table1ColumnName}` +
            " = " +
            `${tableName2}.${table2ColumnName}`;
        if (Object.keys(whereObj).length > 0) {
            sqlQry += " WHERE (" + whereQry + ")";
        }
        if (customSqlWhere !== "") {
            sqlQry += " AND " + customSqlWhere;
        }
        if (orderBy !== "") {
            sqlQry += ` ${orderBy} `;
        }
        if (offset >= 0 && limit >= 0) {
            sqlQry += ` OFFSET ${offset} LIMIT ${limit}`;
        }

        return new Promise((resolve, reject) => {
            this.runQuery(sqlQry)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    //get data with custom param like: tableName, also function is ready to fetch for pagination requests permanently without conditions
    async getLimitData(tableName, fieldsObj = "*", offset, limit) {
        let sqlQry =
            "SELECT " +
            fieldsObj +
            " FROM " +
            tableName +
            " LIMIT " +
            limit +
            " OFFSET " +
            offset;
        return new Promise((resolve, reject) => {
            this.runQuery(sqlQry)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    //get count of table's rows with use conditions optionally
    async countRecord(tableName, whereObj = {},condition = "AND") {
        const whereQry = Object.keys(whereObj)
            .map(function (key, index) {
                let value =
                    typeof whereObj[key] === "string"
                        ? `'${whereObj[key]}'`
                        : `${whereObj[key]}`;
                return `${key} = ${value}`;
            })
            .join(" " + condition + " ");

        let sqlQry = `SELECT COUNT(*) as total FROM ${tableName}`;

        if (Object.keys(whereObj).length > 0) {
            sqlQry += " WHERE (" + whereQry + ")";
        }

        return new Promise((resolve, reject) => {
            this.runQuery(sqlQry)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export default DBManager;