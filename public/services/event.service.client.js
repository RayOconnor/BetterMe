(function(){
  angular
    .module("BetterMe")
    .factory('EventService', eventService);

  function eventService($http) {

    var api = {
      "createEvent": createEvent,
      "getEvents": getEvents,
      "updateEvent": updateEvent,
      "deleteEvent": deleteEvent
    };
    return api;
    
    function createEvent(event) {
      return $http.post("/api/event", event);
    }
    
    function getEvents(event) {
      return $http.get("/api/event");
    }

    function updateEvent(eventId, event) {
      return $http.put("/api/event/"+eventId, event);
    }

    function deleteEvent(eventId) {
      return $http.delete("/api/event/"+eventId);
    }
  }
})();