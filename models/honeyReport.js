'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HoneyReport = Schema({
        id: String,
        honeyName: String,
        user: String,
        ipAttacker: String,
        port: String
});
module.exports = mongoose.model('Reports', HoneyReport);