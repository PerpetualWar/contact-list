var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

var User = require('./User');

router.post('/api', function(req, res) {
  
});

module.exports = router;