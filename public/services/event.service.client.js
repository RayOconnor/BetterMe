(function(){
  angular
    .module("BetterMe")
    .factory('EventService', eventService);

  function eventService($http) {

    var api = {
      createEventForUser: createEventForUser,
      findAllEvents: findAllEvents,
      findEventById: findEventById,
      getEventsForUser: getEventsForUser,
      updateEvent: updateEvent,
      moveEvent: moveEvent,
      deleteEvent: deleteEvent
    };
    return api;
    
    function createEventForUser(event, userId) {
      return $http.post("/api/event/user/"+userId, event);
    }

    function findEventById(eventId) {
      return $http.get("/api/event/"+eventId);
    }

    function findAllEvents() {
      return $http.get("/api/event");
    }
    
    function getEventsForUser(userId) {
      return $http.get("/api/event/user/"+ userId);
    }

    function updateEvent(eventId, event) {
      return $http.put("/api/event/"+eventId, event);
    }
    
    function moveEvent(event) {
      return $http.put("/api/event/move/"+event._id, event);
    }

    function deleteEvent(eventId) {
      return $http.delete("/api/event/"+eventId);
    }
  }
})();