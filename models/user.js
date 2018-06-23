'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
        name: String,
        userName: String,
        password: String,
        honeypots:[{type: Schema.ObjectId, ref:'Honeypot'}]
});
module.exports = mongoose.model('User', UserSchema);