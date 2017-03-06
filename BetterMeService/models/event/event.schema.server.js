module.exports = function () {
  var mongoose = require('mongoose');

  var EventSchema = mongoose.Schema({
    title: {type: String, required: true},
    start: {type: Date, required: true},
    end: Date,
    allDay: Boolean,
    color: String
  }, {collection: 'event'});

  return EventSchema;
};