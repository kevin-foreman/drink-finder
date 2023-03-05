const { Pool } = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;
const dbConn = require('./dbConn');
const pool = dbConn.getPool();

pool.query(`DROP TABLE IF EXISTS liquor CREATE TABLE IF NOT EXISTS liquor (
    id serial primary key,
    name varchar,
    proof numeric)`, (err, data) => {
    if (err) {
        console.log("CREATE TABLE liquor failed");
    } else {
        console.log("liquor table created!")
    }
}
);

pool.end();

// CREATE TABLE liquor (
//     id serial primary key,
//     name varchar,
//     proof numeric
// );