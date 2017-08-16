var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');
var _ = require('lodash');

var ContactList = require('../models/ContactList');


router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  var list = new ContactList({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone
  });
  list.save().then((docs) => {
    res.send(docs);
  }, (e) => {
    res.status(400).send(e);
  });
});

router.get('/', (req, res) => {
  ContactList.find().then((contacts) => {
    res.send( contacts );
  }, (e) => {
    res.status(400).send(e);
  });
});

router.get('/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  ContactList.findById(id).then((contacts) => {
    if (!contacts) {
      return res.status(404).send();
    }
    res.send({ contacts });
  }).catch((e) => {
    res.status(404).send()
  });
});

router.delete('/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  ContactList.findByIdAndRemove(id).then((contacts) => {
    if (!contacts) {
      return res.status(404).send();
    }
    res.status(200).send({ contacts });
  }).catch((e) => {
    res.status(400).send();
  });
});

router.patch('/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['name', 'email', 'address', 'phone']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // if (_.isBoolean(body.completed) && body.completed) {
  //   body.completedAt = new Date().getTime();
  // } else {
  //   body.completed = false;
  //   body.completedAt = null;
  // }

  ContactList.findByIdAndUpdate(id, { $set: body }, { new: true }).then((contacts) => {
    if (!contacts) {
      return res.status(400).send();
    }

    res.send({ contacts });
  }).catch((e) => {
    res.status(400).send();
  })
});

module.exports = router;