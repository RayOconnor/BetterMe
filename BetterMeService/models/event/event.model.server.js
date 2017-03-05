module.exports = function () {

  var api = {
    createEvent: createEvent
  };

  var mongoose = require('mongoose');

  var EventSchema = require('./event.schema.server')();
  var EventModel = mongoose.model('EventModel', EventSchema);

  function createEvent(event) {
    return EventModel.create(event);
  }

  return api;
};