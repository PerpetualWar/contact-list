var mongoose = require('mongoose');

var ContactListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  address: {
    type: String,
    required: false,
    trim: true,
    minlength: 1
  },
  phone: {
    type: Number,
    required: false,
    trim: false,
    minlength: 1
  }
});
mongoose.model('ContactList', ContactListSchema);

module.exports = mongoose.model('ContactList');
