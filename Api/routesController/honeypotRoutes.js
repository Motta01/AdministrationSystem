'use strict'

var express = require('express');
var HoneypotController = require('../functionController/honeypotController');

var api = express.Router();
api.post('/savehoneypot', HoneypotController.saveHoneypot);

module.exports = api;