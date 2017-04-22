module.exports = function (app, EventModel, UserModel) {
  app.post("/api/event/user/:userId", createEventForUser);
  //app.get("/api/event", getEvents);
  app.get("/api/event/user/:userId", getEventsForUser);
  app.put("/api/event/:eventId", updateEvent);
  app.put("/api/event/move/:eventId", moveEvent);
  app.delete("/api/event/:eventId", deleteEvent);

  var _ = require('underscore');

  function createEventForUser(req, res) {
    var newEvent = req.body;
    var userId = req.params.userId;
    newEvent._user = userId;
    EventModel
      .createEvent(newEvent)
      .then(function(event) {
        return UserModel.addEventToUser(event);
      })
      .then(function(event) {
        res.json(event.toObject());
      });
  }

  function getEventsForUser(req, res) {
    var userId = req.params.userId;
    EventModel
      .getEventsForUser(userId)
      .then(function(events) {
        res.json(events);
      })
  }

  function updateEvent(req, res) {
    var eventId = req.params.eventId;
    var updatedEvent = req.body;
    EventModel
      .updateEvent(eventId, updatedEvent)
      .then(function(event) {
        res.json(event.toObject());
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function moveEvent(req, res) {
    var eventId = req.params.eventId;
    var updatedEvent = req.body;
    var returnedEvent;
    EventModel
      .updateEvent(eventId, updatedEvent)
      .then(function(event) {
        returnedEvent = event;
        return UserModel.moveEvent(event);
      })
      .then(function() {
        res.json(returnedEvent);
      })
      .catch(function(error) {
        res.sendStatus(500).send(error);
      });

  }

  function deleteEvent(req, res) {
    var eventId = req.params.eventId;
    var eventToBeDeleted = event;
    EventModel
      .deleteEvent(eventId)
      .then(function(event) {
        eventToBeDeleted = event;
        UserModel.removeEventFromUser(event._user, event)
      })
      .then(function() {
        res.json(eventToBeDeleted);
      })
      .catch(function (error) {
        res.sendStatus(500).send(error);
      });
  }
  
};