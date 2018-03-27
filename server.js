var express = require('express');
var app = express();
var csv  = require('csv-express');
var bodyParser = require('body-parser');
var morgan      = require('morgan');
var jwt = require('jsonwebtoken');

app.use(morgan('dev'));

const config = require('./config');
app.set('superSecret', config.secret);


app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

const customers = require('./routes/customers');
const auth = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var knex = require('knex');

var router = express.Router(); 

app.use('/', router);
app.use('/', auth);
app.use('/customers', customers);

var server = app.listen(8080, function () {
  var host = server.address().address
  const port = process.env.PORT || 8080; 
   
   console.log("Stela app listening at http://%s:%s", host, port)
})
