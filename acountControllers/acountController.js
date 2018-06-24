'use strict'
var bcrypt = require('bcrypt-nodejs')
var User = require('../models/user');

function saveUser(req, res) {
    var user = new User();
    var params = req.body;
    user.name = params.name;
    user.userName = params.userName;
    user.password = null;
    user.honeypots = null;
    console.log({ params });
    console.log({ user });

    if (params.password) {
        bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash;
        });
        if (user.name != null && user.userName != null) {
            user.save((err, userStored) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send({ userStored });
                }
            });
        } else {
            res.status(200).send({ message: 'Complete all the field ' })
        }
    } else {
        res.status(500).send({ message: 'No data' });
    }

}

function prueba(req, res) {

    res.status(200).send({
        message: 'probando controlador'
    });
}
module.exports = {
    prueba,
    saveUser
}