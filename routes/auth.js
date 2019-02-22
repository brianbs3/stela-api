'use strict';

var express    = require('express');        // call express
var app        = express();
const router = require('express').Router();
const knex = require('../config/knex');
const jwt = require('jsonwebtoken');
const config = require('../config');

app.set('superSecret', config.secret);

router.post('/authenticate', function(req, res) {
    // const email = req.body.email || req.query.email;
    // const pass = req.body.password || req.query.password;
    const pin = req.body.pin || req.query.pin;
    if(!pin){
        return res.json({message: 'You must supply a username and password.'});
    }
    const user = {
        pin: pin
    };
//     if(pin == 1234){
//         const token = jwt.sign(user, app.get('superSecret'), {
//             expiresIn : config.TOKENEXPIRETIME
//         });
//         return res.json({
//             success: true,
//             message: `Here is your stela-api token. It will expire in 24 hours. Enjoy!`,
//             token: token
//         });
//     }
// });

    knex.select()
        .from('stylists')
        .where(knex.raw(`pin = password(${pin})`))
        .then(r => {
            if(r[0]) {
                // if (r[0].pin === pin) {
                    user['id'] = r[0]['id'];
                    user['firstName'] = r[0]['firstName'];
                    user['lastName'] = r[0]['lastName'];
                    const token = jwt.sign(user, app.get('superSecret'), {
                        expiresIn : config.TOKENEXPIRETIME
                    });
                    return res.json({
                        success: true,
                        message: `Hello ${r[0]['firstName']} ${r[0]['lastName']}, here is your stela-api token. It will expire in 24 hours. Enjoy!`,
                        token: token
                    });
                // }
                return res.status(403).send({
                  success: false,
                  message: 'Name/Password Does Not Match.  Contact ' + config.CONTACTEMAIL
                });
            }
            return res.status(403).send({
                success: false,
                message: 'User Error.  Contact ' + config.CONTACTEMAIL
            });
        })
        .catch(err => {
            console.error('Error with user', err);
            return res.sendStatus(500);
        });
});

module.exports = router;
