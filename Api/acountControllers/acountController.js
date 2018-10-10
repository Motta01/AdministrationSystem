'use strict'
var bcrypt = require('bcrypt-nodejs')
var User = require('../models/user');
var jwt = require('../services/jwt');
var bodyParser = require('body-parser');

function saveUser(req, res) {
    var user = new User();
    var params = req.body;
    user.name = params.name;
    user.userName = params.userName;
    user.password = params.password;
    user.honeypots = null;

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
function selectUser(req, res) {
    User.find({ 
        $and:[ 
            {name: {$ne:'ivan'}},
            {name: {$ne:'superadmin'}}
        ]}, (err, users) => {
        if (!err) {
            if (users) {
                return res.status(200).send({
                    users: users
                });
            } else {
                res.status(404).send({ message: 'there are not reports' });
            }
        } else {
            res.status(500).send(error);
        }
    });
}

function deleteAccount(req, res) {
    let id = req.params.id;
    User.deleteOne({ _id: id }, (err, response) => {
        if (!err) {
            res.status(200).send({ response: response });
        } else {
            res.status(500).send({ error: err });
        }
    })

}

function loginUser(req, res) {
    var params = req.body;
    var userName = params.userName;
    var password = params.password;
    User.findOne({ userName: userName.toLowerCase() }, (err, user) => {
        if (!err) {
            if (user) {
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {
                        if (params.gethash) {
                            res.status(200).send({ token: jwt.createToken(user) });
                        } else {
                            res.status(200).send({ user: user });
                        }
                    } else {
                        res.status(404).send({ message: 'User have not been logged' });
                    }
                });
            } else {
                res.status(404).send({ message: 'User not found' });
            }
        } else {
            res.status(500).send({ message: 'Petition Error' });
        }
    });
}

function prueba(req, res) {
    var tar = 'hola como estas'
    console.log(tar);
    res.status(200).send({ tar });
}

module.exports = {
    prueba,
    saveUser,
    loginUser,
    selectUser,
    deleteAccount
}