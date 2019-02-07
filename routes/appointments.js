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
      return res.status(200).send({message: 'these are the appointments for you: '});
});

router.get('/myMobileAppointments', tokenAuth, (req, res) => {
    let format = req.query.format || 'JSON';

    format = format.toUpperCase();

    var sel = knex.select()
        .from('appointmentsview')
        .select('clientFirstName', 'clientLastName','ts','appointmentType','appointmentDuration','clientID','areaCode','phonePrefix','phoneLineNumber')
        .select(knex.raw('DATE_FORMAT(ts, "%b %D %Y") as formattedDate'))
        .select(knex.raw('DATE_FORMAT(ts, "%l:%i %p") as formattedTime'))
        .where('stylistID', req.decoded.id)
        .where(knex.raw('ts >= CURDATE()'))
        .orderBy('ts')
        .then(
            m => {
                let ret = {};
                ret['appointments'] = m;
                ret['firstName'] = req.decoded.firstName;
                ret['lastName'] = req.decoded.lastName;
                return (format === "CSV") ? res.csv(JSON.parse(JSON.stringify(ret)), 1) : res.json(ret);
            });

});

router.get('/myMobileAppointments/:id', (req, res) => {
    let format = req.query.format || 'JSON';
    const { id } = req.params;
    format = format.toUpperCase();
    // const query = `SELECT clientFirstName, clientLastName,ts,appointmentType,appointmentDuration,clientID,areaCode,phonePrefix,phoneLineNumber,DATE_FORMAT(ts, "%b %D %Y") as formattedDate FROM stela.appointmentsview where stylistID=${id}`
    var sel = knex.select()
        .from('appointmentsview')
        .select('clientFirstName', 'clientLastName','ts','appointmentType','appointmentDuration','clientID','areaCode','phonePrefix','phoneLineNumber')
        .select(knex.raw('DATE_FORMAT(ts, "%b %D %Y") as formattedDate'))
        .select(knex.raw('DATE_FORMAT(ts, "%l:%i %p") as formattedTime'))
        .where('stylistID', id)


    //     knex.raw(query)
    //         .groupByRaw('formattedDate')
        .then(
            m => {
                return (format === "CSV") ? res.csv(JSON.parse(JSON.stringify(m)), 1) : res.json(m);
            });

});

module.exports = router;