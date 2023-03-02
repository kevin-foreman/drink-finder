DROP TABLE IF EXISTS liquor;
CREATE TABLE liquor (
    id serial primary key,
    name varchar,
    proof numeric
);