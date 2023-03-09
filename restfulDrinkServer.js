'use strict';

// set up dependencies
// require('dotenv').config();
import dotenv from 'dotenv/config';
import cors from 'cors';
import express, { json } from 'express';
const app = express();
import next from 'process';
const port = process.env.port || 8000;
// const colors = require('colors/safe');
import { getPool } from './dbConn.js';
// import { data } from 'jquery';
import pkg from 'jquery';
const { data } = pkg;
const pool = getPool();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS'); // include OPTIONS method
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // respond OK to OPTIONS requests
    }
    next(); 
});

app.use(json());

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
    const query = 'SELECT name, type, liquor_id, decode(image->>\'image\', \'base64\') AS image FROM drinks WHERE id = $1';
    const values = [id];
    pool.query(query, values, (err, result) => {
        const drink = result.rows[0];
        console.log(drink);
        res.send(drink);
    });
});

app.post('/api/liquor/', (req, res, next) => {
    const proof = parseInt(req.body.proof);
    const { name } = req.body;

    if (!name || !proof || Number.isNaN(proof)) {
        return res.status(400).send('Error: missing values')
    } else {

        pool.query('INSERT INTO liquor (name, proof) VALUES ($1, $2) RETURNING *;', [name, proof], (err, result) => {
            if (err) {
                return next(err);
            };
            let liquorInfo = result.rows[0];
            console.log('Added: ' + liquorInfo);
            res.status(200).send(liquorInfo);
        });
    };
});

app.post('/api/drinks/', (req, res, next) => {
    const { name, type, liquor_id } = req.body;

    if (!name || !type || !liquor_id) {
        return res.status(400).send('Error: missing values')
    } else {

        pool.query('INSERT INTO drinks (name, type, image, liquor_id) VALUES ($1, $2, $3, $4) RETURNING *;', [name, type, liquor_id], (err, result) => {
            if (err) {
                return next(err);
            };
            let drinkInfo = result.rows[0];
            console.log('Added: ' + drinkInfo);
            res.status(200).send(drinkInfo);
        });
    };
});

app.patch('/api/drinks/:id', (req, res, next) => {
    // parse id from URL
    const id = Number.parseInt(req.params.id);
    // get data from request body
    const liquor_id = Number.parseInt(req.body.proof);
    const { name, type, image } = req.body;
    // if id input is ok, make DB call to get existing values
    if (!Number.isInteger(liquor_id)) {
        res.status(400).send("No drink found with that ID");
    }
    console.log("drinkID: ", id);
    // get current values of the pet with that id from our DB
    pool.query('SELECT * FROM drinks WHERE id = $1', [id], (err, result) => {
        if (err) {
            return next(err);
        }
        console.log("request body name, type, image, liquor_id: ", name, type, image, liquor_id);
        const drink = data;
        console.log("Single drink ID from DB", id, "values:", drink);
        if (!drink) {
            return res.status(404).send("No drink found with that ID");
        } else {
            const updatedName = name || drink.name;
            const updatedType = type || drink.type;
            const updatedImage = image || drink.image
            const updatedLiquorId = liquor_id || drink.liquor_id;

            pool.query('UPDATE drinks SET name=$1, type=$2, image=$3, liquor_id=$4 WHERE id = $4 RETURNING *',
                [updatedName, updatedType, updatedImage, updatedLiquorId, id], (err, data) => {
                    if (err) {
                        return next(err);
                    }
                    const updatedDrink = data;
                    console.log("updated row:", updatedDrink);
                    return res.send(updatedDrink);
                });
        };
    });
});

app.patch('/api/liquor/:id', (req, res, next) => {
    // parse id from URL
    const id = Number.parseInt(req.params.id);
    // get data from request body
    const liquor_id = Number.parseInt(req.body.proof);
    const { name, type } = req.body;
    // if id input is ok, make DB call to get existing values
    if (!Number.isInteger(id)) {
        res.status(400).send("No liquor found with that ID");
    }
    console.log("liquorID: ", id);
    // get current values of the pet with that id from our DB
    pool.query('SELECT * FROM liquor WHERE id = $1', [id], (err, result) => {
        if (err) {
            return next(err);
        }
        console.log("request body name, type, liquor_id: ", name, type, liquor_id);
        const drink = result.rows[0];
        console.log("Single liquor ID from DB", id, "values:", liquor);
        if (!liquor) {
            return res.status(404).send("No liquor found with that ID");
        } else {
            const updatedName = name || liquor.name;
            const updatedProof = proof || liquor.proof;

            pool.query('UPDATE liquor SET name=$1, proof=$2 WHERE id = $3 RETURNING *',
                [updatedName, updatedProof], (err, data) => {
                    if (err) {
                        return next(err);
                    }
                    const updatedLiquor = data.rows[0];
                    console.log("updated row:", updatedLiquor);
                    return res.send(updatedLiquor);
                });
        };
    });
});

app.delete("/api/liquor/:id", (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).send("No liquor found with that ID");
    }

    pool.query('DELETE FROM liquor WHERE id = $1 RETURNING *', [id], (err, data) => {
        if (err) {
            return next(err);
        }

        const deletedLiquor = data.rows[0];
        console.log(deletedLiquor);
        if (deletedLiquor) {
            // respond with deleted row
            res.send(deletedLiquor);
        } else {
            res.status(404).send("No liquor found with that ID");
        }
    });
});

app.delete("/api/drinks/:id", (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).send("No drink found with that ID");
    }

    pool.query('DELETE FROM drinks WHERE id = $1 RETURNING *', [id], (err, data) => {
        if (err) {
            return next(err);
        }

        const deletedDrink = data.rows[0];
        console.log(deletedDrink);
        if (deletedDrink) {
            // respond with deleted row
            res.send(deletedDrink);
        } else {
            res.status(404).send("No drink found with that ID");
        }
    });
});

app.use(cors({ origin: '*' }));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    // console.log('Connecting to postgres pool: ', pool);
});