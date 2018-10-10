'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Recommendation = Schema({
        // Detallado de todo lo que esta en el honeypot.
        service: String,
        description: String,
});
module.exports = mongoose.model('Recommendation', Recommendation);