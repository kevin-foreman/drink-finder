const { Pool } = require('pg');
const dbConn = require('./dbConn');
const pool = dbConn.getPool();

pool.query(`INSERT INTO drinks (name, type, image, liquor_id) VALUES
    ('Titos & Soda', 'Cocktail', '{"filename": "./assets/titos-soda-lime.jpg", "data": "base64-encoded-image-data"}', 1),
    ('Vodka Tonic', 'Cocktail', '{"filename": "./assets/vodka-tonic.jpg", "data": "base64-encoded-image-data"}', 1),
    ('Stormin Sailor', 'Cocktail', '{"filename": "./assets/stormin-sailor.jpg", "data": "base64-encoded-image-data"}', 8),
    ('Cranberry & Rum', 'Daiquiri', '{"filename": "./assets/cranberry-rum.jpg", "data": "base64-encoded-image-data"}', 5),
    ('Sailors Yule', 'Nog', '{"filename": "./assets/sailors-yule-node.jpg", "data": "base64-encoded-image-data"}', 8),
    ('Cup O Jerry', 'Coffee', '{"filename": "./assets/cup-o-jerry.jpg", "data": "base64-encoded-image-data"}', 8),
    ('Sevilla', 'Spritz', '{"filename": "./assets/sevilla-spritz.jpg", "data": "base64-encoded-image-data"}', 2),
    ('The Number 10', 'Martini', '{"filename": "./assets/number-10.jpg", "data": "base64-encoded-image-data"}', 2),
    ('London Dry', 'Negroni', '{"filename": "./assets/london-dry-negroni.jpg", "data": "base64-encoded-image-data"}', 2),
    ('Neat', 'Whisky', '{"filename": "./assets/macallan-10.jpg", "data": "base64-encoded-image-data"}', 3),
    ('Summer Nights', 'Cocktail', '{"filename": "./assets/summer-nights.jpg", "data": "base64-encoded-image-data"}', 6),
    ('Blackberry Smash', 'Sipper', '{"filename": "./assets/berry-smash.jpg", "data": "base64-encoded-image-data"}', 9),
    ('Dirty Shirley', 'Old-school', '{"filename": "./assets/dirty-shirley.jpg", "data": "base64-encoded-image-data"}', 2),
    ('Pineapple Rum', 'Cocktail', '{"filename": "./assets/pineapple-rum.jpg", "data": "base64-encoded-image-data"}', 7),
    ('Island Rum', 'Punch', '{"filename": "./assets/island-rum.jpg", "data": "base64-encoded-image-data"}', 9),
    ('Captains Passion', 'Punch', '{"filename": "./assets/captains-passion.jpg", "data": "base64-encoded-image-data"}', 9)`,
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