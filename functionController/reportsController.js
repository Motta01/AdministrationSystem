'use strict'

var Reports = require('../models/honeyReport');
var Gerential_report = require('../models/gerentialReport');
var Honeypot = require('../models/honeypot');

function reportCatcher(req, res) {

    var params = req.body;
    var report = new Reports();
    var gerentialReport = new Gerential_report();

    Gerential_report.findOne({ session: params.session }, (error, reportStored) => {
        if (reportStored == null) {
            report.local_host = params.local_host;
            report.protocol = params.protocol;
            report.session = params.session;
            report.date = params.date;
            report.data = params.data;
            report.event = params.event;
            report.millisecond = params.millisecond;
            report.date_time = params.date_time;
            report.data_hash = params.data_hash;
            report.service = params.service;
            report.local_port = params.local_host;
            report.remote_port = params.remote_port;
            report.bytes = params.body;
            report.time = params.time;
            report.remote_host = params.remote_port;

            report.save((err, reportStorade) => {
                if (err) {
                    res.status(500).send({ message: 'error to sace report' });
                }
            });
            Honeypot.findOne({ ip: params.local_host.toLowerCase() }, (error, honeypotStorade) => {
                if (honeypotStorade!=null) {
                    gerentialReport.honey_name = honeypotStorade.honey_name;
                    gerentialReport.owner = honeypotStorade.owner;
                    gerentialReport.dangerous_level = '';
                    gerentialReport.description = '';
                    gerentialReport.session = params.session;
                    gerentialReport.date = params.date;
                    gerentialReport.service = params.service;
                    gerentialReport.local_host = params.local_host;
                    gerentialReport.local_port = params.local_host;
                    gerentialReport.remote_port = params.remote_port;
                    gerentialReport.remote_host = params.remote_port;

                    gerentialReport.save((er, gerentialReportStored) => {
                        if (!er) {
                            console.log(gerentialReportStored);
                        } else {
                            console.log(er)
                        }
                    });
                } else {
                    console.log(error);
                }
            });
        } else {
            console.log(2);
            report.local_host = params.local_host;
            report.protocol = params.protocol;
            report.session = params.session;
            report.date = params.date;
            report.data = params.data;
            report.event = params.event;
            report.millisecond = params.millisecond;
            report.date_time = params.date_time;
            report.data_hash = params.data_hash;
            report.service = params.service;
            report.local_port = params.local_port;
            report.remote_port = params.remote_port;
            report.bytes = params.body;
            report.time = params.time;
            report.remote_host = params.remote_host;

            report.save((err, reportStorade) => {
                if (err) {
                    res.status(500).send({ message: 'error to sace report' });
                }
            });
        }
    });
}


module.exports = {
    reportCatcher
}