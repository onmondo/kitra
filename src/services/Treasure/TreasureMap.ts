import { GeolibInputCoordinates } from "geolib/es/types";
import { MySQLClient } from "../../util/MySQLClient";
import IReport from "./IReport";
import { TCoordinates } from "./types";
import { getDistance } from "geolib";

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
        console.log(page, limit,  offset)
    }

    v1 = ((self: TreasureMap) => ({
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
        },

        getTreasureCoordinates() {
            const mysqlClient = MySQLClient.getInstance()
            const pool = mysqlClient.getConnectionPool();
            const sqlQuery = 'select * from kitra.Treasure limit ? offset ? ';
            self.computeOffset({ page: self.page, limit: self.limit })
            const result = new Promise((resolve, reject) => {
                pool.query(sqlQuery, [self.limit, self.offset], (err, results, fields) => {
                    if (err) {
                        console.error('Error executing SQL query:', err);
                        reject(err);
                    }
        
                    resolve(results);
                });
            })
            // pool.getConnection(async (err, connection) => {
            //     await connection.beginTransaction((err) =>{ if(err) throw new Error('Failed to begin transaction')})
            //     connection.query("INSERT INTO KITRA.TREASURE (lattitude, longitude) VALUES (?, ?)", ["21681634", "161316843"])

            //     connection.commit()
            // })
    
            return result;
        }
    })).bind(this)

    v2 = ((self: TreasureMap) => ({
        ...this.v1,

        getTotalTreasureCoordinates() {
            const mysqlClient = MySQLClient.getInstance()
            const pool = mysqlClient.getConnectionPool();
            const sqlQuery = 'select count(*) from kitra.Treasure';
            const cursor = pool.query(sqlQuery)

            cursor.on("result", (result) => {
                return result
            });

            cursor.on("error", (err) => {
                throw new Error(`Error has occured on fetching treassures: ${err.message}`)
            });

            // temporary disabled for endind database connection
            // current connection type is pool
            // cursor.on("end", () => {
            //     connection.end()
            // })
        },

        async getTreasureCoordinates(pins: string[], range: number): Promise<TCoordinates[]> {
            const mysqlClient = MySQLClient.getInstance()
            const pool = mysqlClient.getConnectionPool();
            const sqlQuery = 'select * from kitra.Treasure limit ? offset ? ';
            self.computeOffset({ page: self.page, limit: self.limit })
            const result = new Promise((resolve, reject) => {
                const coordinatesWithinRange: TCoordinates[] = []
                const cursor = pool.query(sqlQuery, [self.limit, self.offset]);
                
                cursor.on("result", (row) => {
                    const coordinate = row as TCoordinates
                    const geoLibCoordinate: GeolibInputCoordinates = {
                        latitude: coordinate.latitude, 
                        longitude: coordinate.longtitude
                    } 
                    const distance = getDistance({ latitude: pins[0], longitude: pins[1] }, geoLibCoordinate)
                    if (distance <= (range * 1000)) { // 1000 meters = 1 kilometer
                        coordinatesWithinRange.push(coordinate);
                    }
                });
    
                cursor.on("error", (err) => {
                    reject(err)
                });
    
                cursor.on("end", () => {
                    resolve(coordinatesWithinRange)
                })
    
                return coordinatesWithinRange;
            })

            return await result as TCoordinates[]
        }
    })).bind(this)

    v3 = ((self: TreasureMap) => ({
        ...this.v2,

        getTreasureCoordinates() {
            const mysqlClient = MySQLClient.getInstance()
            const pool = mysqlClient.getConnectionPool();
            const sqlQuery = 
            `SELECT 
                id, latitude, longtitude, name
            FROM
                kitra.Treasure
            WHERE
                id >= (SELECT 
                        id
                    FROM
                        kitra.Treasure
                    ORDER BY id ASC
                    LIMIT 1) + ?
            LIMIT ?;`;
            self.computeOffset({ page: self.page, limit: self.limit })
            return pool.query(sqlQuery, [self.offset, self.limit]);
        },

        getTreasureCoordinatesWithPrize() {
            console.log("executing this: getTreasureCoordinatesWithPrize v3")
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
                t.id >= (SELECT 
                    id
                FROM
                    kitra.Treasure
                ORDER BY id ASC
                LIMIT 1) + ?
            LIMIT ?;`;
    
            self.computeOffset({ page: self.page, limit: self.limit })
            return pool.query(sqlQuery, [self.offset, self.limit])
    
        }
    })).bind(this)
    
    // getTreasureCoordinates() {
    //     const mysqlClient = MySQLClient.getInstance()
    //     const pool = mysqlClient.getConnectionPool();
    //     const sqlQuery = 'select * from kitra.Treasure limit ? offset ? ';
    //     this.computeOffset({ page: this.page, limit: this.limit })
    //     const result = new Promise((resolve, reject) => {
    //         pool.query(sqlQuery, [this.limit, this.offset], (err, results, fields) => {
    //             if (err) {
    //                 console.error('Error executing SQL query:', err);
    //                 reject(err);
    //             }
    
    //             resolve(results);
    //         });
    //     })

    //     return result;
    // }

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
            (tm.amt BETWEEN 10 AND ?)
            AND t.id >= (SELECT 
                id
            FROM
                kitra.Treasure
            ORDER BY id ASC
            LIMIT 1) + ?
        LIMIT ?;`;

        const result = new Promise((resolve, reject) => {
            this.computeOffset({ page: this.page, limit: this.limit })
            pool.query(sqlQuery, [this.prize, this.offset, this.limit], (err, results, fields) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    reject(err);
                }
                console.log('SQL query executed successfully:', results);

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