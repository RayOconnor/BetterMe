module.exports = function () {
  var mongoose = require('mongoose');

  var InviteSchema = mongoose.Schema({
    message: {type: String, required: true},
    dateCreated: {type: Date, required: true},
    resolved: Boolean,
    _sender: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    _recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    _regimen: {type: mongoose.Schema.Types.ObjectId, ref: 'RegimenModel'}
  }, {collection: 'event'});

  return InviteSchema;
};