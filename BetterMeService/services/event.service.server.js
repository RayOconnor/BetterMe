module.exports = function (app, EventModel, UserModel) {
  app.post("/api/event/user/:userId", createEventForUser);
  //app.get("/api/event", getEvents);
  app.get("/api/event/user/:userId", getEventsForUser);
  app.put("/api/event/:eventId", updateEvent);
  app.delete("/api/event/:eventId", deleteEvent);

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

  function deleteEvent(req, res) {
    var eventId = req.params.eventId;
    EventModel
      .deleteEvent(eventId)
      .then(function(event) {
        res.json(event);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }
  
};