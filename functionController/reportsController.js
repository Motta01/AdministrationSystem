'use strict'

var Reports = require('../models/honeyReport');

function catcherOfReports(req, res) {
    var params = req.body;
    var report = new Reports();
    console.log(params.date_time);
}
module.exports ={
    catcherOfReports
}