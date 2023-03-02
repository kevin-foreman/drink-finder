// set up dependencies
const express = require('express');
const app = express();
const fs = require('fs');
const next = require('process');
// const colors = require('colors/safe');
const { Pool } = require('pg');

app.use(express.json());

const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    database: 'drinkShop',
    password: 'password',
    port: 5432
});

app.get('/api/drinks', (req, res, next) => {
    pool.query("Select * FROM drinks", (err, result) => {
        if (err) {
            return next(err);
        }
        const rows = result.rows;
        console.log(rows);
        res.send(rows); 
    });
});

app.get('/api/liquor', (req, res, next) => {
    pool.query("Select * FROM liquor", (err, result) => {
        if (err) {
            return next(err);
        }
        const rows = result.rows;
        console.log(rows);
        res.send(rows); 
    });
});

app.get('/api/liquor/:id', (req, res, next) => {

    const id = Number.parseInt(req.params.id);
    const result = pool.query('SELECT name, proof FROM liquor WHERE id = $1', [id], (err, result) => {
        if (err) {
            return next(err);
        };
        const pet = result.rows[0];
        console.log(pet);
        res.send(pet);
    });
});

app.get('/api/drinks/:id', (req, res, next) => {

    const id = Number.parseInt(req.params.id);
    const result = pool.query('SELECT name, type, liquor_id FROM drinks WHERE id = $1', [id], (err, result) => {
        if (err) {
            return next(err);
        };
        const pet = result.rows[0];
        console.log(pet);
        res.send(pet);
    });
});

const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});