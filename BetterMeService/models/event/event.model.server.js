module.exports = function () {

  var api = {
    createEvent: createEvent,
    findEventById: findEventById,
    findEventsForRegimen: findEventsForRegimen,
    findEventsForRegimenAndUser: findEventsForRegimenAndUser,
    findAllEvents: findAllEvents,
    getEventsForUser: getEventsForUser,
    createEventForUser: createEventForUser,
    createEventsFromArray: createEventsFromArray,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
    deleteEventsForRegimen: deleteEventsForRegimen
  };

  var q = require('q');
  var mongoose = require('mongoose');

  var EventSchema = require('./event.schema.server')();
  var EventModel = mongoose.model('EventModel', EventSchema);

  return api;

  function createEvent(event) {
    return EventModel.create(event);
  }

  function createEventForUser(event) {
    var d = q.defer();

    EventModel
      .findById(event._user, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          user.events.push(event._id);
          user.save();
          d.resolve(event);
        }
      });

    return d.promise;
  }

  function createEventsFromArray(eventArray) {
    var d = q.defer();

    EventModel.create(eventArray, function (err, events) {
      if(err) {
        d.reject(err);
      } else {
        d.resolve(events);
      }
    });

    return d.promise;
  }

  function findEventById(eventId) {
    var d = q.defer();

    EventModel
      .findById(eventId, function (err, event) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(event);
        }
      });

    return d.promise;
  }

  function findAllEvents() {
    var d = q.defer();

    EventModel
      .find({}, function (err, events) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(events);
        }
      });

    return d.promise;
  }
  
  function findEventsForRegimen(regimenId) {
    var d = q.defer();

    EventModel.find({_regimen: regimenId}, function (err, events) {
      if(err) {
        d.reject(err);
      } else {
        d.resolve(events);
      }
    });
    
    return d.promise;
  }

  function findEventsForRegimenAndUser(regimenId, userId) {
    var d = q.defer();

    EventModel.find({$and :[{_user: userId}, {_regimen: regimenId}]}, function (err, events) {
      if(err) {
        d.reject(err);
      } else {
        d.resolve(events);
      }
    });

    return d.promise;
  }


  function getEventsForUser(userId) {
    var d = q.defer();

    EventModel
      .find({ _user: userId }, function (err, events) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(events);
        }
      });

    return d.promise;
  }

  function updateEvent(eventId, event) {
    var d = q.defer();

    EventModel
      .findOneAndUpdate({'_id': eventId}, event, {new: true}, function (err, event) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(event);
        }
      });

    return d.promise;
  }

  function deleteEvent(eventId) {
    var d = q.defer();

    EventModel
      .remove({'_id': eventId}, function (err, status) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(status);
        }
      });

    return d.promise;
  }

  function deleteEventsForRegimen(regimenId) {
    var d = q.defer();

    EventModel
      .find({_regimen: regimenId}, function (err, events) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(events);
        }
    }).remove();

    return d.promise;
  }
 
};