'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.connect("mongodb://jesusQuinatana:cc0221210009@ds215961.mlab.com:15961/as-1", (err) => {
    if (err) {
        throw err;
    } else {
        console.log("CONECTION IS STABLE");
        app.listen(port, function () {
            console.log("SERVER IS LISTENING");
        });
    }
});