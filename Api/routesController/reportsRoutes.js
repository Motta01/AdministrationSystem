'use strict'
var express = require('express');
var Report = require('../functionController/reportsController');

var api = express.Router();
api.post('/catcherofreports', Report.reportCatcher);
api.get('/getreports/:session', Report.getReports);
api.get('/getgerentialreports/:id?', Report.getGerentialReport);


module.exports = api;