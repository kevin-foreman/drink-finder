const { Pool } = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;
const dbConfig = require('./dbConn');

const pool = new Pool({
    connectionString: DATABASE_URL,
    ...dbConfig,
});

pool.query(`DROP TABLE IF EXISTS drinks CREATE TABLE IF NOT EXISTS drinks (
    id serial primary key,
    name varchar,
    type varchar,
    liquor_id int,
    FOREIGN KEY (liquor_id)
    REFERENCES liquor(id)
    )`, (err, data) => {
    if (err) {
        console.log("CREATE TABLE drinks failed");
    } else {
        console.log("drinks table created!")
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