'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var jwt = require('jsonwebtoken');
const config = require('../config');
app.set('superSecret', config.secret);

// check header or url parameters or post parameters for token
module.exports = (req, res, next) => {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.status(401).send({success: false, message: 'Failed to authenticate token. Has it expired?'});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
};

