const { Pool } = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;
const dbConfig = require('./dbConn')

pool.query(`CREATE TABLE IF NOT EXISTS liquor (
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