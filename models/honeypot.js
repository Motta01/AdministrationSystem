'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    var HoneypotSchema = Schema({
        name: String,
        owner:String
    });
module.exports = mongoose.model('Honeypot', HoneypotSchema);
