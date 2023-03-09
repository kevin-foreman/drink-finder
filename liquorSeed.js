import { Pool } from 'pg';
import { getPool } from './dbConn';
const pool = getPool();


// Run liquor seed SQL
pool.query(`INSERT INTO liquor (name, proof) VALUES
    ('Titos', 80),
    ('Tanqueray', 94),
    ('Macallan 15', 86),
    ('Jack Daniels', 80),
    ('Captain Morgan', 100),
    ('Wild Turkey Rare Breed', 112),
    ('Everclear', 190),
    ('Sailor Jerry', 92),
    ('Parrot Bay', 42)`,
    (err, data) => {
        if (err) {
            console.log("Liquor insert failed");
        } else {
            console.log(data);
        }
    }
);

// Close connection
pool.end();