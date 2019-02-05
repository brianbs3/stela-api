'use strict';

const router = require('express').Router();
const knex = require('../config/knex');
const tokenAuth = require('../middleware/tokenAuth');


router.get('/', tokenAuth, (req, res) => {
    let format = req.query.format || 'JSON';
    format = format.toUpperCase();
    console.log('client route');

    // knex.select().from('clients').then(
    //     m => {
    //         return (format === "CSV") ? res.csv(JSON.parse(JSON.stringify(m)), 1) : res.json(m);
    //     });
    return res.status(200).send({message: 'hello world'});
});

router.get('/notes', (req, res) => {
    let format = req.query.format || 'JSON';
    format = format.toUpperCase();

    knex.select().from('notesView').then(
        m => {
        return (format === "CSV") ? res.csv(JSON.parse(JSON.stringify(m)), 1) : res.json(m);
    });
});

router.get('/notes/:clientID', (req, res) => {
    let format = req.query.format || 'JSON';
    const { clientID } = req.params;
    format = format.toUpperCase();

    knex.select()
        .from('notesView')
        .where('clientID', clientID)
        .then(
            m => {
            return (format === "CSV") ? res.csv(JSON.parse(JSON.stringify(m)), 1) : res.json(m);
        });
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
  let { firstName, lastName, areaCode, phonePrefix, phoneLineNumber, email, address1, address2, city, state, zip, promotionEmail, promotionText, appointmentAlert } = req.body;
  lastName = lastName || null;
  areaCode = areaCode || null;
  phonePrefix = phonePrefix || null;
  phoneLineNumber = phoneLineNumber || null;
  email = email || null;

  if(firstName && lastName && areaCode && phonePrefix && phoneLineNumber && email) {
    knex('customers')
      .insert({
        firstName: firstName, 
        lastName: lastName,
        areaCode: areaCode,
        phonePrefix: phonePrefix,
        phoneLineNumber: phoneLineNumber,
        email: email,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zip: zip,
        promotionEmail: promotionEmail,
        promotionText: promotionText,
        appointmentAlert: appointmentAlert
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
