'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secert_key';

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'Header Authorization not found' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            return res.status(403).send({ message: 'Token expired' });
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send({ message: 'Token not valid' });
    }
    req.user = payload;
    next();
}