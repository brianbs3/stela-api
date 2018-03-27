const config = require('../config');


const knex = require('knex')(config.DB,{
    debug: ['comQueryPacket']
});

module.exports = knex;
