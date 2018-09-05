'use strict'

var Reports = require('../models/honeyReport');
var Gerential_report = require('../models/gerentialReport');
var Honeypot = require('../models/honeypot');
var mongoosePaginate = require('mongoose-pagination');
var Global_description = require('../services/Description');

function reportCatcher(req, res) {
    var params = req.body;
    var report = new Reports();
    var gerentialReport = new Gerential_report();

    Gerential_report.findOne({ session: params.session }, (error, reportStored) => {
        if (!error) {
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
                        gerentialReport.protocol = params.protocol;


                        gerentialReport.save((err, gerentialReportStored) => {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                res.status(200).send({ gerentialReportStored });
                            }
                        });
                    } else {
                        var honeypot = new Honeypot();
                        honeypot.name = null;
                        honeypot.ip = params.local_host;
                        honeypot.owner = null;
                        honeypot.save((err, honeypotStorade) => {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                res.status(200).send({ honeypot: honeypotStorade });
                            }
                        });
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
        } else {
            res.status(500).send({ message: 'error to sace report' });
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
    var name = req.params.name;
    var date = req.params.fecha;
    if (date) {
        Gerential_report.find({ date: date }, (err, reportStorade) => {
            if (!err) {
                return res.status(200).send({ data: reportStorade });
            } else {
                res.status(500).send('Error to find the gerential report');
            }
        });
    } else if (name) {
        Gerential_report.find({ honey_name: name }, (err, reportStorade) => {
            if (!err) {
                return res.status(200).send({ data: reportStorade });
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
                    if (report.honey_name) {
                        name = report.honey_name;

                        var aux = {
                            honey_name: name,
                            service: report.service,
                            date: report.date,
                            local_port: report.local_port,
                            remote_host: report.remote_host,
                            protocol : report.protocol
                        }
                        consolidated.push(aux);
                    }
                }
                res.status(200).send({ data: consolidated });
            } else {
                res.status(500).send(err);
            }
        }).sort('date');
    }
}
function removeDuplicates(originalArray, ) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
        lookupObject[originalArray[i]] = originalArray[i];
    }

    for (i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    return newArray;
}
function servicesDashboards(req, res) {
    var services = [];
    Gerential_report.find((err, reports) => {
        if (!err) {
            var index = 0;
            reports.forEach(report => {
                var into = true;
                var count = 0;
                reports.forEach(report2 => {
                    if (report.service == report2.service) {
                        count++;
                        reports.slice(index, 1);
                    }
                    index++;
                });
                var service = {
                    service: report.service,
                    count: count
                };
                services.forEach(data => {
                    if (data.service == service.service) {
                        into = false;
                    }
                });
                if (into) {
                    services.push(service);
                }
                count = 0;
                index = 0;
            });
            res.status(200).send(services)
        } else {
            res.status(500).send(err);
        }
    }).sort('date');
}

function portDashboards(req, res) {
    var ports = [];
    Gerential_report.find((err, reports) => {
        if (!err) {
            var index = 0;
            reports.forEach(report => {
                var into = true;
                var count = 0;
                reports.forEach(report2 => {
                    if (report.local_port == report2.local_port) {
                        count++;
                        reports.slice(index, 1);
                    }
                    index++;
                });
                var port = {
                    port: report.local_port,
                    count: count
                };
                ports.forEach(data => {
                    if (data.port == port.port) {
                        into = false;
                    }
                });
                if (into) {
                    ports.push(port);
                }
                count = 0;
                index = 0;
            });
            res.status(200).send(ports);
        } else {
            res.status(500).send(err);
        }
    }).sort('date');
}

function remote_hostDashboards(req, res) {
    var hosts = [];
    Gerential_report.find((err, reports) => {
        if (!err) {
            var index = 0;
            reports.forEach(report => {
                var into = true;
                var count = 0;
                reports.forEach(report2 => {
                    if (report.remote_host == report2.remote_host) {
                        count++;
                        reports.slice(index, 1);
                    }
                    index++;
                });
                var host = {
                    host: report.remote_host,
                    count: count
                };
                hosts.forEach(data => {
                    if (data.host == host.host) {
                        into = false;
                    }
                });
                if (into) {
                    hosts.push(host);
                }
                count = 0;
                index = 0;
            });
            res.status(200).send(hosts);
        } else {
            res.status(500).send(err);
        }
    }).sort('date');
}

function recomendation(req, res){
    var service = req.params.service;

}


module.exports = {
    reportCatcher,
    getGerentialReport,
    getReports,
    servicesDashboards,
    portDashboards,
    remote_hostDashboards,
    recomendation
}