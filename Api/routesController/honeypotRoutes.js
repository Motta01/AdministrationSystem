'use strict'

var express = require('express');
var HoneypotController = require('../functionController/honeypotController');

var api = express.Router();
api.post('/savehoneypot', HoneypotController.saveHoneypot);
api.get('/getnonamedhoneypot', HoneypotController.selectNoNamedHoneypot);

module.exports = api;