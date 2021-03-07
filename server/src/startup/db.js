import 'babel-polyfill'
import pkg from 'pg';

const {Pool} = pkg;

class Db{
    constructor({connectionString})
    {
        if(!connectionString)
          throw new Error(`connectionString must be set to Db constructor`);
        
        this.connectionString = connectionString;
    }
    //Generate Pool of PG package for connect to db
    generatePool(){
       const connectionString = this.connectionString;
        return new Pool({
            connectionString
        });
    }
    //health check of connection to postgresql Server
    async healthCheck(){
        const pool = this.generatePool();
        const client = await pool.connect();

        try {
            return await client.query("SELECT 1");
        } catch (error) {
            console.error("Error", error.message);
            throw error;
        } finally {
            client.release();
        }
        
    }
}

export default Db;