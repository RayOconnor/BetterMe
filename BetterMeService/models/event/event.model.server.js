module.exports = function (app) {
  app.post("/api/event", createEvent);
  app.get("/api/event", getEvents)
  app.put("/api/event/:eventId", updateEvent);
  app.delete("/api/event/:eventId", deleteEvent);

  var mongoose = require('mongoose');

  var EventSchema = require('./event.schema.server')();
  var EventModel = mongoose.model('EventModel', EventSchema);

  function createEvent(req, res) {
    EventModel.create(req.body);
  }

  function updateEvent(req, res) {
    var eventId = req.params.eventId;
    EventModel.update(eventId, req.body)
      .then(function(event) {
        res.json(event);
      });
  }

  function getEvents(req, res) {
    EventModel.find()
      .then(function(events) {
        res.json(events);
      });
  }

  function deleteEvent(req, res) {
    EventModel.remove(req.params.eventId);
  }
};