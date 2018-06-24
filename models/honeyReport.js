'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HoneyReport = Schema({
        id: String,
        honeyName: String,
        user: { type: Schma.ObjectId, ref: 'user' },
        attacker: String,
        port: String,
        description: String
});
module.exports = mongoose.model('Reports', HoneyReport);