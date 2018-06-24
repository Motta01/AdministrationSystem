'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
// cargar rutas 
var user_routes = require('./routesController/user');

//Parseo a JSON de las entradas
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', user_routes);
module.exports = app;
