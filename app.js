var express = require('express');
var app = express();

var { mongoose } = require('./db/mongoose');
var controller = require('./routes/controller');

var port = process.env.PORT || 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', controller);

app.listen(port, function () {
  console.log('Server running on port ' + port);
});

module.exports = app;