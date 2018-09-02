'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 4100;


//mongoose.connect("mongodb://localhost:27017/database", (err) => {
mongoose.connect("mongodb://arastro:mifriek1992@ds141942.mlab.com:41942/as-1", (err) => {
    if (err) {
        throw err;
    } else {
        console.log("CONECTION IS STABLE");
        app.listen(port, function () {
            console.log("SERVER IS LISTENING");
        });
    }
});