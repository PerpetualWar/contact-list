var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');
var _ = require('lodash');

var ContactList = require('./models/ContactList');
var { mongoose } = require('./db/mongoose');
var controller = require('./routes/controller');

var port = process.env.PORT || 3000;
// app.use('/api', controller);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());



app.post('/api', (req, res) => {
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

app.get('/api', (req, res) => {
  ContactList.find().then((contacts) => {
    res.send( contacts );
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/api/:id', (req, res) => {
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

app.delete('/api/:id', (req, res) => {
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

app.patch('/api/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['name', 'email', 'password', 'phone']);

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

app.listen(port, function () {
  console.log('Server running on port ' + port);
});

module.exports = app;