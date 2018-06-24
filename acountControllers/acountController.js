'use strict'
var bcrypt = require('bcrypt-nodejs')
var User = require('../models/user');

function save(req, res) {
    var user = new User();
    var params = req.body;
    console.log(params);

    if (params.password != null && params.name != null && params.userName != null) {
        bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash;
            user.name = params.name;
            user.userName = params.userName;
            user.honeypots = params.honeypots;
        });
    } else {
        res.status(500).send({ message: 'No data' });
    }
    user.save((err,userStored)=>{
        if(err){
            res.status(500).send({message: 'Successless when save'})
        }else{
            res.status(200).send(userStored);
        }
    });
}

function prueba(req, res) {

    res.status(200).send({
        message: 'probando controlador'
    });
}
module.exports = {
    prueba,
    save
}