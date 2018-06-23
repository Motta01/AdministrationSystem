'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//rutas {

//}

//Parseo a JSON de las entradas{
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//}

//Configurar cabeceras http {

//}

// Cargar las rutas {

//}

module.exports= app;
