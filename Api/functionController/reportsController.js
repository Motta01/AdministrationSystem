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
                            protocol: report.protocol
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
            res.status(200).send({data:services})
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
            res.status(200).send({data:ports});
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
            res.status(200).send({data:hosts});
        } else {
            res.status(500).send(err);
        }
    }).sort('date');
}

function recomendation(req, res) {
    var all = {
        service: 'todo',
        description1: 'Asegúrese de que su sistema esté actualizado con los últimos parches de seguridad. Esto significa ir al sitio de actualizaciones de Windows.',
        description2: 'Asegúrese de tener una buena solución de firewall, no solo el software predeterminado de firewall de Windows. Si bien está bien, no funciona tan bien como otros firewalls gratuitos o pagos.',
        description3: 'Eche un vistazo a sus elementos y servicios de inicio a través de MSCONFIG y borre sus archivos temporales y caché de Internet. Puede ir a Inicio> Ejecutar> y escribir% temp%, luego presionar enter para acceder a la mayoría de sus archivos temporales. También deberá acceder a su navegador de Internet y borrar su caché, incluidos los archivos sin conexión. ',
        description4: 'Descargue programas como Malwarebytes , Superantispyware o spybot , y una vez que los haya descargado, asegúrese de que estén actualizados. Luego, una vez que se actualicen, reinicie su sistema y entre en modo seguro sin necesidad de red y ejecute un escaneo completo con cada uno. También tenga en cuenta que Hijackthis es un excelente programa para encontrar agujeros de seguridad y malware en un sistema, y ​​es posible que desee descargar un explorador de rootkits . ',
        description5: 'Una vez que piense que su sistema es seguro, es hora de asegurarse de que se mantenga de esa manera. Con Firefox puedes descargar complementos como noscript y WOT para evitar que tu sistema se haga cargo mientras navegas. También la actualización de su archivo de host con programas como Hostsman hace maravillas. Programas como Peerguardian y Protowall ayudarán a evitar que los IP obtengan su información, y si se siente realmente vulnerable, instale y actualice un programa de antivirus. Si realmente quieres llevarlo al extremo, ejecuta todos tus navegadores en una máquina virtual o un programa de espacio aislado como Sandboxie (gracias a Logan por este hallazgo)',
    }
    var specific = [
        {
            service: 'MySQL',
            description: 'Continuar con el puerto abierto y configurar el servicio para determinar que IP’s se les puede aceptar una petición de conexión.',
        },
        {
            service: 'PostgreSQL',
            description: 'Continuar con el puerto abierto y configurar el servicio para determinar que IP’s se les puede aceptar una petición de conexión.',
        },
        {
            service: 'DNS',
            description: 'Usar DNS over TLS, para cifrar y ajustar consultas y respuestas del Sistema de nombres de dominio (DNS) a través del protocolo de Seguridad de la capa de transporte (TLS), con el objetivo de aumentar la privacidad y la seguridad del servicio de manipulación de datos DNS a través de ataques man-in-the-middle .',
        },
        {
            service: 'Telnet.Windows',
            description: 'Aconsejable usar SSH debido a que los datos enviados por telnet se envían en texto plano en contraste con SSH, que encripta los datos.'
        },
        {
            service: 'Telnet',
            description: 'Aconsejable usar SSH debido a que los datos enviados por telnet se envían en texto plano en contraste con SSH, que encripta los datos.'
        },
        {
            service: 'SNMP',
            description: 'Configurar el servicio para que pueda utilizar el protocolo SSL/TLS ya que este protocolo utiliza algoritmos de cifrado que hace que los datos que se transfieren entre dos sistemas sean imposibles de leer.'
        },
        {
            service: 'TFTP',
            description: 'Utilizar protocolo SFTP (Protocolo de transferencia segura de archivos) para cifrar la transferencia de archivos con Secure Shell'
        },
        {
            service: 'FTP',
            description: 'Utilizar protocolo SFTP (Protocolo de transferencia segura de archivos) para cifrar la transferencia de archivos con Secure Shell'
        },
        {
            service: 'SMTP',
            description: 'Cifrado: cuando asegure su servidor de correo, asegúrese de estar utilizando conexiones seguras. Cifre la autenticación POP3 e IMAP y use SSL y TLS. ' + 'Configuración de retransmisión de correo: evite ser un retransmisor abierto para los remitentes de correo no deseado especificando qué dominios / direcciones IP su servidor de correo retransmitirá. ' + 'Conexiones y configuraciones predeterminadas: para evitar ataques DoS, limite el número de errores de conexión y autenticación que sus sistemas aceptarán. Elimine la funcionalidad innecesaria del servidor al deshabilitar cualquier configuración predeterminada innecesaria. Tener un servidor de correo dedicado y mover otros servicios como FTP a otros servidores. Mantenga las conexiones totales, simultáneas y máximas limitadas a su servidor SMTP',
        },
    ]
    var service = req.params.service;
    var recomendationToSend = {}
    var normal={
            all1: all.description1,
            all2: all.description2,
            all3: all.description3,
            all4: all.description4,
            all5: all.description5,
        }
        recomendationToSend.normal =normal;
    
    specific.forEach(rec => {
        if (rec.service == service) {
            recomendationToSend.specific = rec.description;
        }
    });
    res.status(200).send({ recomendationToSend });
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