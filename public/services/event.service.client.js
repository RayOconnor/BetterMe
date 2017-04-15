(function(){
  angular
    .module("BetterMe")
    .factory('EventService', eventService);

  function eventService($http) {

    var api = {
      createEventForUser: createEventForUser,
      getEventsForUser: getEventsForUser,
      updateEvent: updateEvent,
      deleteEvent: deleteEvent
    };
    return api;
    
    function createEventForUser(event, userId) {
      return $http.post("/api/event/user/"+userId, event);
    }
    
    function getEventsForUser(userId) {
      return $http.get("/api/event/user/"+ userId);
    }

    function updateEvent(eventId, event) {
      return $http.put("/api/event/"+eventId, event);
    }

    function deleteEvent(eventId) {
      return $http.delete("/api/event/"+eventId);
    }
  }
})();