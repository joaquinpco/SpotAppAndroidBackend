'use strict';

const express = require('express');
const router = express.Router();

const config = require("../database/config");
const CosmosClient = require("@azure/cosmos").CosmosClient;

const { endpoint, key, databaseId, containerId } = config;
const client = new CosmosClient({ endpoint, key });

const Database = require('../database/database');
const database = new Database(client, databaseId, containerId);

router.get('/', async (req, res) => {
    await database.init();
    
    res.status(200).send({
        msg: 'got it!',
        clubs: await database.getAll()
    });
});

router.post('/', async (req, res) => {
    res.status(200).send({
        msg: 'created!'
    });
});

router.put('/', async (req, res) => {
    res.status(200).send({
        msg: 'updated!'
    });
});

module.exports = router;