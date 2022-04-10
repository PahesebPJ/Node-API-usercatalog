const express = require('express');
const config = require('./config');
var cors = require('cors')

const app = express();

//App listening
app.set('port', config.port);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Routes
var clientsAPI = require('./controllers/clientsController');
app.use('/api/clients', clientsAPI);

module.exports = app;