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

router.get('/:id', tokenAuth, (req, res) => {
  const { id } = req.params;
  let format = req.query.format || 'JSON';
  format = format.toUpperCase();

  knex.select()
    .from('customers')
    .where('id', id)
    .then(
    m => {
      return (format === "CSV") ? res.csv(JSON.parse(JSON.stringify(m)), 1) : res.json(m);
    }
  );
});

router.post('/', tokenAuth, (req, res) => {
console.log(req.body);
  let { firstName, lastName, areaCode, phonePrefix, phoneLineNumber, email } = req.body;
  lastName = lastName || null;
  areaCode = areaCode || null;
  phonePrefix = phonePrefix || null;
  phoneLineNumber = phoneLineNumber || null;
  email = email || null;
console.log(firstName);
  if(firstName && lastName && areaCode && phonePrefix && phoneLineNumber && email) {
    knex('customers')
      .insert({
        firstName: firstName, 
        lastName: lastName,
        areaCode: areaCode,
        phonePrefix: phonePrefix,
        phoneLineNumber: phoneLineNumber,
        email: email 
      })
      .then(
        m => {
          return(res.json(m));
        }
      );
  }
  else
    return res.json({message: 'Invalid data to create user.'});
  
});


module.exports = router;
