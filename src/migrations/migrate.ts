require('dotenv').config();
import fs from "fs";
import { MySQLClient } from "../util/MySQLClient"

const createUserScript: string = fs.readFileSync(__dirname + "/createuser.sql", "utf8");
const createTreasureScript: string = fs.readFileSync(__dirname + "/createtreasure.sql", "utf8");
const createMoneyValueScript: string = fs.readFileSync(__dirname + "/createmoneyvalue.sql", "utf8");

const pool = MySQLClient.getInstance().getConnectionPool();
pool.query(createUserScript, (err, results, fields): void => {
    if (err) {
        console.error('Error executing createUserScript:', err);
        return;
    }
    console.log('Query results:', results);
});

pool.query(createTreasureScript, (err, results, fields) => {
    if (err) {
        console.error('Error executing createTreasureScript:', err);
        return;
    }
    console.log('Query results:', results);
});

pool.query(createMoneyValueScript, (err, results, fields) => {
    if (err) {
        console.error('Error executing createMoneyValueScript:', err);
        return;
    }
    console.log('Query results:', results);
    pool.end((err) => {
        if (err) {
            console.error('Error closing connection pool:', err);
        } else {
            console.log('Connection pool closed');
        }
    });
});


