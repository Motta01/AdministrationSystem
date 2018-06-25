'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HoneyReport = Schema({
        // Detallado de todo lo que esta en el honeypot.
        id: String,
        honey_ip: String,
        honey_name: String,
        session: String,
        user: String,
        local_port: String,
        service: String,
        ip_attacker: String,
        port_attacker: String,

        /*
        general service
                Date: String,
                honey_name: String,
                honey_ip: String,
                service: String,
                local_port: String,
                port_attacker: String,
                ip_attacker: String,
        */
});
module.exports = mongoose.model('Reports', HoneyReport);