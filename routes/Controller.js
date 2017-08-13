var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var ContactList = require('../models/ContactList');


router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));

router.post('/api', (req, res) => {
  var list = new ContactList({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  });
  list.save().then((docs) => {
    res.send(docs);
  }, (e) => {
    res.status(400).send(e);
  });
});

router.get('/api', (req, res) => {
  ContactList.find().then((lists) => {
    res.send({ lists });
  }, (e) => {
    res.status(400).send(e);
  });
});

module.exports = router;