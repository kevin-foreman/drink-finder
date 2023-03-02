DROP TABLE liquor;
CREATE TABLE IF NOT EXISTS liquor (
    id serial primary key,
    name varchar,
    proof numeric
);