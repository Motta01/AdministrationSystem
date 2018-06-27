'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    var HoneypotSchema = Schema({
        name: String,
        ip:String,
        owner:String
    });
module.exports = mongoose.model('Honeypot', HoneypotSchema);
