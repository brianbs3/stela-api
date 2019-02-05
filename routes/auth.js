'use strict';

var express    = require('express');        // call express
var app        = express();
const router = require('express').Router();
const knex = require('../config/knex');
const jwt = require('jsonwebtoken');
const config = require('../config');

app.set('superSecret', config.secret);

router.get('/authenticate', function(req, res) {
    // const email = req.body.email || req.query.email;
    // const pass = req.body.password || req.query.password;
    const pin = req.body.pin || req.query.pin;
    if(!pin){
        return res.json({message: 'You must supply a username and password.'});
    }
    const user = {
        pin: pin
    };
    if(pin == 1234){
        const token = jwt.sign(user, app.get('superSecret'), {
            expiresIn : config.TOKENEXPIRETIME
        });
        return res.json({
            success: true,
            message: `Here is your stela-api token. It will expire in 24 hours. Enjoy!`,
            token: token
        });
    }
});

//     knex.select()
//         .from('stylists')
//         .where({
//             pin: pin
//         })
//         .then(r => {
//             if(r[0]) {
//                 if (r[0].email === email && r[0].password === pass) {
//                     const token = jwt.sign(user, app.get('superSecret'), {
//                         expiresIn : config.TOKENEXPIRETIME
//                     });
//                     return res.json({
//                         success: true,
//                         message: `Hello ${email}, here is your stela-api token. It will expire in 24 hours. Enjoy!`,
//                         token: token
//                     });
//                 }
//                 return res.status(403).send({
//                   success: false,
//                   message: 'Name/Password Does Not Match.  Contact ' + config.CONTACTEMAIL
//                 });
//             }
//             return res.status(403).send({
//                 success: false,
//                 message: 'User Error.  Contact ' + config.CONTACTEMAIL
//             });
//         })
//         .catch(err => {
//             console.error('Error with user', err);
//             return res.sendStatus(500);
//         });
// });

module.exports = router;
