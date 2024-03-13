require('dotenv').config();
import fs from "fs";
import { MySQLClient } from "../util/MySQLClient"

const seedUserScript = fs.readFileSync(__dirname + "/seeduser.sql", "utf8");
const seedTreasureScript = fs.readFileSync(__dirname + "/seedtreasure.sql", "utf8");
const seedMoneyValueScript = fs.readFileSync(__dirname + "/seedmoneyvalue.sql", "utf8");

const userScripts = seedUserScript.split('\n').filter((userScript) => !userScript.includes("--") && userScript.length !== 0);
const treasureScripts = seedTreasureScript.split('\n').filter((userScript) => !userScript.includes("--") && userScript.length !== 0);
const moneyValueScripts  = seedMoneyValueScript.split('\n').filter((userScript) => !userScript.includes("--") && userScript.length !== 0);

const pool = MySQLClient.getInstance().getConnectionPool();

userScripts.forEach(userScript => {
    pool.query(userScript, (err, results, fields) => {
        if (err) {
            console.error('Error executing seedUserScript:', err);
            return;
        }
        console.log('Query results:', results);
    });
});

treasureScripts.forEach(treasureScript => {
    pool.query(treasureScript, (err, results, fields) => {
        if (err) {
            console.error('Error executing seedTreasureScript:', err);
            return;
        }
        console.log('Query results:', results);
    });
});

moneyValueScripts.forEach((moneyValueScript, index) => {
    pool.query(moneyValueScript, (err, results, fields) => {
        if (err) {
            console.error('Error executing seedMoneyValueScript:', err);
            return;
        }
        console.log('Query results:', results);
        if (index === moneyValueScripts.length - 1) {
            pool.end((err) => {
                if (err) {
                    console.error('Error closing connection pool:', err);
                } else {
                    console.log('Connection pool closed');
                }
            });
        }
    });
});