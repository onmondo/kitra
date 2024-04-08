import mysql, { PoolOptions, Pool  } from "mysql2";
import { envKeys } from "./config";

export class MySQLClient {
    private static instance: MySQLClient;

    private conectionPool: Pool;

    getConnectionPool() {
        return this.conectionPool
    }

    private constructor() {
        const {
            MYSQL_DB_HOST,
            MYSQL_DB_USERNAME,
            MYSQL_DB_PASSWORD,
            MYSQL_DB_NAME
        } = envKeys();
        const connectionOptions: PoolOptions = {
            connectionLimit: 10, // Maximum number of connections in the pool
            host: MYSQL_DB_HOST,
            user: MYSQL_DB_USERNAME,
            password: MYSQL_DB_PASSWORD,
            database: MYSQL_DB_NAME
        }
        this.conectionPool = mysql.createPool(connectionOptions);
    }

    public static getInstance = (): MySQLClient => {
        if (!MySQLClient.instance) {
            console.log("Creating new client instance...");
            MySQLClient.instance = new MySQLClient()
        }

        return MySQLClient.instance;
    }
}