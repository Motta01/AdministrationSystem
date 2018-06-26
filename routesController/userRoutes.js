'use strict'

var express = require('express');
var AcountController = require('../acountControllers/acountController');
var api = express.Router();

var md_Auth = require('../middlewares/authenticated');

api.get('/prueba', AcountController.prueba);
api.post('/saveuser', AcountController.saveUser);
api.post('/loginuser', AcountController.loginUser);

module.exports = api;