import { MySQLClient } from "../../util/MySQLClient";

export class TreasureMap {
    private prize: number = 0;

    setPrize(prize: number) {
        this.prize = prize;
    }

    getTreasureCoordinates() {
        const mysqlClient = MySQLClient.getInstance()
        const pool = mysqlClient.getConnectionPool();
        const sqlQuery = 'select * from kitra.Treasure';
        const result = new Promise((resolve, reject) => {
            pool.query(sqlQuery, (err, results, fields) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    reject(err);
                }
                // console.log('SQL query executed successfully:', results);
    
                resolve(results);
            });
        })

        return result;
    }

    getTreasureCoordinatesWithPrize() {
        const mysqlClient = MySQLClient.getInstance()
        const pool = mysqlClient.getConnectionPool();
        const sqlQuery = 
        `SELECT 
            t.*, tm.*
        FROM
            kitra.Treasure t
                LEFT JOIN
            kitra.Money_Value tm ON t.id = tm.treasure_id
        WHERE
            tm.amt BETWEEN 0 AND ?;`;

        const result = new Promise((resolve, reject) => {
            pool.query(sqlQuery, [this.prize], (err, results, fields) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    reject(err);
                }
                // console.log('SQL query executed successfully:', results);

                resolve(results);
            });
        })

        return result;
    }
}