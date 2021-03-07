import 'babel-polyfill'
import pkg from 'pg';

const {Pool} = pkg;

class Db{
    constructor({host,user,password,database,port})
    {
        if(!host)
          throw new Error(`host must be set to Db constructor`);

        if(!user)
          throw new Error(`user must be set to Db constructor`);

        if(!password)
          throw new Error(`password must be set to Db constructor`);

        if(!database)
          throw new Error(`database must be set to Db constructor`);

        if(!port)
          throw new Error(`port must be set to Db constructor`);
        
        this.host= host;
        this.user= user;
        this.password= password;
        this.database= database;
        this.port= port;
    }
    //Generate Pool of PG package for connect to db
    generatePool(){
        return new Pool({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port
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