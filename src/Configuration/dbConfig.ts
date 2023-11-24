import dotenv from 'dotenv'
import mssql from 'mssql'
dotenv.config()

export const sqlConfig = {
    user : "sa",
    password: "honestly",
    database:"PROJECT",
    server : 'BARONGO\\MSSQLSERVER002',
    pool:{
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options:{
        encrypt: false,
        trustServerCertificate: true
    }
}

export const pool = new mssql.ConnectionPool(sqlConfig);
export const connect = pool.connect();

export async function testConnection() {
    // console.log(sqlConfig);
  
    const pool = await mssql.connect(sqlConfig);
    //testing if db is connected
    if (pool.connected) {
      console.log("connected to database");
    } else {
      console.log("connection failed");
    }
  }