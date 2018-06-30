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

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methos','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
    next();
});


app.use('/api', user_routes);
app.use('/api', honey_routes);
app.use('/api', reports_routes);

module.exports = app;
