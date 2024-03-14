import { MySQLClient } from "../../util/MySQLClient";

export default class Reports {
    static async getAllUsers() {
        const mysqlClient = MySQLClient.getInstance()
        const pool = mysqlClient.getConnectionPool();
        const sqlQuery = 'select * from kitra.User';
        const result = new Promise((resolve, reject) => {
            pool.query(sqlQuery, (err, results, fields) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    reject(err);
                }
    
                resolve(results);
            });
        })

        return result;
    }

    static async getUserById(id: string) {
        const mysqlClient = MySQLClient.getInstance()
        const pool = mysqlClient.getConnectionPool();
        const sqlQuery = 'select * from kitra.User where id = ?';
        const result = new Promise((resolve, reject) => {
            pool.query(sqlQuery, [id], (err, results, fields) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    reject(err);
                }
                resolve(results);
            });
        })

        return result;
    }
}