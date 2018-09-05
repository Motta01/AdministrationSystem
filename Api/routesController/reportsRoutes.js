'use strict'
var express = require('express');
var Report = require('../functionController/reportsController');

var api = express.Router();
api.post('/catcherofreports', Report.reportCatcher);
api.get('/getreports/:session', Report.getReports);
api.get('/servicesdashboards', Report.servicesDashboards);
api.get('/portdashboards', Report.portDashboards);
api.get('/remote_hostDashboards', Report.remote_hostDashboards);
api.get('/getgerentialreports/:name?', Report.getGerentialReport);


module.exports = api;