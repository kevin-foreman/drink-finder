const { Pool } = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;
const dbConn = require('./dbConn');
const pool = dbConn.getPool();

pool.query(`DROP TABLE IF EXISTS drinks CREATE TABLE drinks (
    id serial primary key,
    name varchar(60),
    type varchar(60),
    liquor_id int,
    FOREIGN KEY (liquor_id)
    REFERENCES liquor(id)
    )`, (err) => {
    if (err) {
        console.log("CREATE TABLE drinks failed");
    } else {
        console.log("drinks table created!");
    }
}
);

pool.end();



//  DROP TABLE drinks;
//  CREATE TABLE IF NOT EXISTS drinks(
//     id serial primary key,
//     name varchar,
//     type varchar,
//     liquor_id int,
//     FOREIGN KEY(liquor_id)
//    REFERENCES liquor(id)
// );