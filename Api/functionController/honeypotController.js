'use strict'
var bcrypt = require('bcrypt-nodejs')
var Honeypot = require('../models/honeypot');

function saveHoneypot(req, res) {
    var honeypot = new Honeypot();
    var params = req.body;
    honeypot.name = params.name;
    honeypot.owner = params.owner;
    honeypot.ip = params.ip;

    if (honeypot.ip) {
        Honeypot.deleteOne({ ip: honeypot.ip }, (err, honeypotDeleted) => {
            if (!err) {
                if (honeypot.name && honeypot.owner && honeypot.ip) {
                    honeypot.save((err, userStored) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.status(200).send({ user:userStored });
                        }
                    });
                } else {
                    res.status(200).send({ message: 'Complete all the field ' })
                }
            } else {
                res.status(500).send({ error: err });
            }
        });
    } else {
        res.status(200).send({ message: 'Complete all the field ' })
    }

}



function selectNoNamedHoneypot(req, res) {
    Honeypot.find({ name: null, owner: null }, (err, honeypots) => {
        if (!err) {
            if (honeypots) {
                return res.status(200).send({
                    honeypots: honeypots
                });
            } else {
                res.status(404).send({ message: 'there are not reports' });
            }
        } else {
            res.status(500).send(error);
        }
    });
}

function selectAll(req,res){
    Honeypot.find({}, (err, honeypots) => {
        if (!err) {
            if (honeypots) {
                return res.status(200).send({
                    honeypots: honeypots
                });
            } else {
                res.status(404).send({ message: 'there are not reports' });
            }
        } else {
            res.status(500).send(error);
        }
    });
}

module.exports = {
    saveHoneypot,
    selectNoNamedHoneypot,
    selectAll
}