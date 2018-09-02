'use strict'

var express = require('express');
var AcountController = require('../acountControllers/acountController');
var api = express.Router();

var md_Auth = require('../middlewares/authenticated');

api.get('/prueba', AcountController.prueba);
api.get('/selectuser', AcountController.selectUser);
api.post('/saveuser', AcountController.saveUser);
api.post('/loginuser', AcountController.loginUser);
api.delete('/deleteaccount/:id', AcountController.deleteAccount);

module.exports = api;