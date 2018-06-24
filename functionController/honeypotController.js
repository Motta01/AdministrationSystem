'use strict'
var bcrypt = require('bcrypt-nodejs')
var Honeypot = require('../models/honeypot');

function saveHoneypot(req, res) {
    var honeypot = new Honeypot();
    var params = req.body;
    honeypot.name = params.name;
    honeypot.userName = params.userName;
    console.log({ params });
    console.log({ honeypot });

        if (honeypot.name) {
            honeypot.save((err, userStored) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send({ userStored });
                }
            });
        } else {    
            res.status(200).send({ message: 'Complete all the field ' })
        }

}

module.exports = {
    saveHoneypot
}