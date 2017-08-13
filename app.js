var express = require('express');
var app = express();
var db = require('mongoose');

var port = process.env.PORT || 3001;

db.connect('mongodb://perp:daba8MN90,@ds145293.mlab.com:45293/contact-list');

app.listen(port, function() {
  console.log('Server running on port ' + port);
});

module.exports = app;