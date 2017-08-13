var express = require('express');
var app = express();
// var mongoose = require('mongoose');
var { mongoose } = require('./db/mongoose');
var controller = require('./routes/Controller');

var port = process.env.PORT || 3000;
app.use('/api', controller);

app.listen(port, function () {
  console.log('Server running on port ' + port);
});

module.exports = app;