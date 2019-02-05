'use strict';

const router = require('express').Router();
const knex = require('../config/knex');
const tokenAuth = require('../middleware/tokenAuth');


router.get('/', (req, res) => {
    let format = req.query.format || 'JSON';
    format = format.toUpperCase();
    console.log('client route');

    // knex.select().from('clients').then(
    //     m => {
    //         return (format === "CSV") ? res.csv(JSON.parse(JSON.stringify(m)), 1) : res.json(m);
    //     });
    return res.status(200).send({message: 'these are the appointments for you: '});
});
module.exports = router;