'use strict'

var Reports = require('../models/honeyReport');
var Honeypot = require('../models/honeypot');

function catcherOfReports(req, res) {
    var params = req.body;
    var report = new Reports();
    Honeypot.findOne({ ip: params.local_host.toLowerCase() }, (error, honeypot) => {
        if (!error) {
            try {
                report.honey_name = honeypot.name;
                report.user = honeypot.owner;

                report.honey_ip = params.local_host;
                report.session = params.session;
                report.local_port = params.local_port;
                report.service = params.service;
                report.ip_attacker = params.remote_host;
                report.port_attacker = params.remote_port;

                report.save((er, reportStored) => {
                    if (!er) {
                        console.log(reportStored);
                    } else {
                        console.log(er)
                    }
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log(error);
        }
    });
}

module.exports = {
    catcherOfReports
}