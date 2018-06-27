'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GerentialReport = Schema({

    honey_name: String,
    owner: String,
    session: String,
    date: String,
    service: String,
    local_host: String,
    local_port: String,
    remote_port: String,
    remote_host: String,
    dangerous_level: String,
    description: String

});
module.exports = mongoose.model('Gerential_report', GerentialReport);