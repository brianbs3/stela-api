'use strict';

const router = require('express').Router();
const knex = require('../config/knex');
const tokenAuth = require('../middleware/tokenAuth');

router.get('/', tokenAuth, (req, res) => {
    let format = req.query.format || 'JSON';
    format = format.toUpperCase();

    knex.select().from('customers').then(
        m => {
            return (format === "CSV") ? res.csv(JSON.parse(JSON.stringify(m)), 1) : res.json(m);
        }
    );
});

module.exports = router;
