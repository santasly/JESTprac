"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.connect = exports.pool = exports.sqlConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mssql_1 = __importDefault(require("mssql"));
dotenv_1.default.config();
exports.sqlConfig = {
    user: "sa",
    password: "honestly",
    database: "PROJECT",
    server: 'BARONGO\\MSSQLSERVER002',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};
exports.pool = new mssql_1.default.ConnectionPool(exports.sqlConfig);
exports.connect = exports.pool.connect();
async function testConnection() {
    // console.log(sqlConfig);
    const pool = await mssql_1.default.connect(exports.sqlConfig);
    //testing if db is connected
    if (pool.connected) {
        console.log("connected to database");
    }
    else {
        console.log("connection failed");
    }
}
exports.testConnection = testConnection;
