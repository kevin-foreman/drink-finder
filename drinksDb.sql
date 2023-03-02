DROP TABLE IF EXISTS drinks;
CREATE TABLE drinks (
    id serial primary key,
    name varchar,
    type varchar,
    liquor_id int
);