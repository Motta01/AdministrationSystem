'use strict'

var express = require('express');
var AcountController = require('../acountControllers/acountController');

var api = express.Router();

api.get('/prueba', AcountController.prueba);
api.post('/save', AcountController.save);

module.exports = api;