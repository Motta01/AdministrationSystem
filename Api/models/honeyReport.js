'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HoneyReport = Schema({
        // Detallado de todo lo que esta en el honeypot.
        local_host: String,
        protocol: String,
        session: String,
        date: String,
        data: String,
        event: String,
        millisecond: String,
        date_time: String,
        data_hash: String,
        service: String,
        local_port: String,
        remote_port: String,
        bytes: String,
        time: String,
        remote_host: String
});
module.exports = mongoose.model('Reports', HoneyReport);