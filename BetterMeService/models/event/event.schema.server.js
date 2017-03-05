module.exports = function () {
  var mongoose = require('mongoose');

  var EventSchema = mongoose.Schema({
    title: {type: String, required: true},
    start: {type: Date, required: true},
    end: Date,
    allDay: String,
    color: String
  }, {collection: 'betterme.event'});

  return EventSchema;
};