DROP TABLE drinks;
CREATE TABLE IF NOT EXISTS drinks (
    id serial primary key,
    name varchar,
    type varchar,
    liquor_id int,
    FOREIGN KEY (liquor_id)
    REFERENCES liquor(id)
);