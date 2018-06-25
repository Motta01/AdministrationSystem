'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
// cargar rutas 
var user_routes = require('./routesController/userRoutes');
var honey_routes = require('./routesController/honeypotRoutes');
var reports_routes = require('./routesController/reportsRoutes');

//Parseo a JSON de las entradas
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', user_routes);
app.use('/api', honey_routes);
app.use('/api', reports_routes);

module.exports = app;
