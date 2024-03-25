import { MySQLClient } from "../../util/MySQLClient";
import IReport from "./IReport";

export class TreasureMap implements IReport {
    limit: number = 10;
    page: number = 1;
    offset: number = 0;

    private prize: number = 0;

    setPrize(prize: number) {
        this.prize = prize;
    }

    setLimit(limit: number) {
        this.limit = limit
    }

    setPage(page: number) {
        this.page = page
    }

    private computeOffset({page, limit}: IReport):void {
        const offset = (page - 1) * limit;
        this.offset = offset;
    }

    getTotalTreasureCoordinates() {
        const mysqlClient = MySQLClient.getInstance()
        const pool = mysqlClient.getConnectionPool();
        const sqlQuery = 'select count(*) from kitra.Treasure';
        const result = new Promise((resolve, reject) => {
            pool.query(sqlQuery, (err, results) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    reject(err);
                }
    
                resolve(results);
            });
        })

        return result;
    }

    getTreasureCoordinates() {
        const mysqlClient = MySQLClient.getInstance()
        const pool = mysqlClient.getConnectionPool();
        const sqlQuery = 'select * from kitra.Treasure limit ? offset ? ';
        this.computeOffset({ page: this.page, limit: this.limit })
        const result = new Promise((resolve, reject) => {
            pool.query(sqlQuery, [this.limit, this.offset], (err, results, fields) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    reject(err);
                }
    
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
            tm.amt BETWEEN 10 AND ?
        LIMIT ?
        OFFSET ?;`;

        const result = new Promise((resolve, reject) => {
            this.computeOffset({ page: this.page, limit: this.limit })
            pool.query(sqlQuery, [this.prize, this.limit, this.offset], (err, results, fields) => {
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

    getTreasureBoxesById(id: string) {
        const mysqlClient = MySQLClient.getInstance()
        const pool = mysqlClient.getConnectionPool();
        const sqlQuery = `select * from kitra.Treasure where id = ?;`;
        const result = new Promise((resolve, reject) => {
            pool.query(sqlQuery, [id], (err, results, fields) => {
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