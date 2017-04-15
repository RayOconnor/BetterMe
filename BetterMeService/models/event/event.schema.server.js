module.exports = function () {
  var mongoose = require('mongoose');

  var EventSchema = mongoose.Schema({
    title: {type: String, required: true},
    start: {type: Date, required: true},
    end: Date,
    dateCreated: {type: Date, required: true},
    allDay: Boolean,
    color: String,
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    _regimen: {type: mongoose.Schema.Types.ObjectId, ref: 'RegimenModel'}
  }, {collection: 'event'});

  return EventSchema;
};