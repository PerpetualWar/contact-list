var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://perp:daba8MN90,@ds145293.mlab.com:45293/contact-list', {
  useMongoClient: true
});

module.exports = { mongoose };