import { Pool } from 'pg';
const DATABASE_URL = process.env.DATABASE_URL;
import { getPool } from './dbConn';
const pool = getPool();

pool.query(`DROP TABLE IF EXISTS liquor; CREATE TABLE liquor (
    id serial primary key,
    name varchar(60),
    proof numeric)`, (err) => {
    if (err) {
        console.log("CREATE TABLE liquor failed");
    } else {
        console.log("liquor table created!");
    }
}
);

pool.end();

// CREATE TABLE liquor (
//     id serial primary key,
//     name varchar,
//     proof numeric
// );