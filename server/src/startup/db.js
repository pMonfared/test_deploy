import 'babel-polyfill'
import pkg from 'pg';

const {Pool} = pkg;

class Db{
    constructor({connectionString,sslEnabled})
    {
        if(!connectionString)
          throw new Error(`connectionString must be set to Db constructor`);
        
        this.connectionString = connectionString;
        this.sslEnabled = sslEnabled;
    }
    //Generate Pool of PG package for connect to db
    generatePool(){
        if(this.sslEnabled === true){
            return new Pool({
                connectionString: this.connectionString,
                ssl: this.sslEnabled
            });
        }

        return new Pool({
            connectionString: this.connectionString
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