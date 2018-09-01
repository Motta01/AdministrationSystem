'use strict'

var Reports = require('../models/honeyReport');
var Gerential_report = require('../models/gerentialReport');
var Honeypot = require('../models/honeypot');
var mongoosePaginate = require('mongoose-pagination');

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
                if (honeypotStorade != null) {

                    gerentialReport.honey_name = honeypotStorade.name;
                    gerentialReport.owner = honeypotStorade.owner;      
                    gerentialReport.dangerous_level = '';
                    gerentialReport.description = '';
                    gerentialReport.session = params.session;
                    gerentialReport.date = params.date;
                    gerentialReport.service = params.service;
                    gerentialReport.local_host = params.local_host;
                    gerentialReport.local_port = params.local_port;
                    gerentialReport.remote_port = params.remote_port;
                    gerentialReport.remote_host = params.remote_host;

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
function getReports(req, res) {
    var session = req.params.session;
    var itemsPerPage = 4;
    Reports.find({ session: session }).sort('date').paginate(session, itemsPerPage, (err, reports, totalReport) => {
        if (!err) {
            if (reports) {
                return res.status(200).send({
                    pages: totalReport,
                    reports: reports
                });
            } else {
                res.status(404).send({ message: 'there are not reports' });
            }
        } else {
            res.status(500).send(error);
        }
    });
}
function getGerentialReport(req, res) {
    var id = req.params.id;
    if (id) {
        Gerential_report.findOne({ _id: id }, (err, reportStorade) => {
            if (!err) {
                return res.status(200).send(reportStorade);
            } else {
                res.status(500).send('Error to find the gerential report');
            }
        });
    } else {
        var consolidated = [];
        Gerential_report.find((err, reports) => {
            if (!err) {
                for (let report of reports) {
                    let name;
                    if(report.honey_name){
                        name = report.honey_name;
                    }else{
                        name = report._id;
                    }
                    var aux = {
                        name:name,
                        service: report.service,
                        date: report.date
                    }
                    consolidated.push(aux);
                }
                res.status(200).send({data :consolidated});
            } else {
                res.status(500).send(err);
            }
        }).sort('date');
    }
}

module.exports = {
    reportCatcher,
    getGerentialReport,
    getReports

}