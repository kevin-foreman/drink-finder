const { Pool } = require('pg');
const dbConn = require('./dbConn');
const pool = dbConn.getPool();

pool.query(`INSERT INTO drinks (name, type, image, liquor_id) VALUES
    ('Titos & Soda', 'Cocktail', '{"filename": "tito-soda-lime.jpg", "data": "base64-encoded-image-data"}', 1),
    ('Vodka Tonic', 'Cocktail', 1),
    ('Stormin Sailor', 'Cocktail', 8),
    ('Cranberry & Rum', 'Daiquiri', 5),
    ('Sailors Yule', 'Nog', 8),
    ('Cup O Jerry', 'Coffee', 8),
    ('Sevilla', 'Spritz', 2),('The Number 10', 'Martini', 2),
    ('London Dry', 'Negroni', 2),
    ('Neat', 'Whisky', 3),
    ('Summer Nights', 'Cocktail', 6),
    ('Blackberry Smash', 'Sipper', 9),
    ('Dirty Shirley', 'Old-school', 2),
    ('Pineapple Rum', 'Cocktail', 7),
    ('Island Rum', 'Punch', 9),
    ('Captains Passion', 'Punch', 9)`,
    (err, data) => {
        if (err) {
            console.log('Drinks insert failed');
        } else {
            console.log(data);
        }
    }
    );

    // Close connection
    pool.end();