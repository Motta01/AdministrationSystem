'use strict'

var express = require('express');
var AcountController = require('../acountControllers/acountController');

var api = express.Router();
api.get('/prueba', AcountController.prueba);
api.post('/saveuser', AcountController.saveUser);

module.exports = api;