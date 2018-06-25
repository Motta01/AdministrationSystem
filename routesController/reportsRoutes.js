'use strict'
var express = require('express');
var Report = require('../functionController/reportsController');

var api = express.Router();
api.post('/catcherofreports', Report.catcherOfReports);
module.exports = api;