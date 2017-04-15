(function() {
  angular
    .module("BetterMe")
    .controller("eventController", EventController);

  function EventController($routeParams, EventService) {
    var vm = this;
    vm.userId = $routeParams.uid;

    vm.createEvent = createEvent;
    vm.updateEvent = updateEvent;
    vm.editEvent = editEvent;
    vm.dropEvent = dropEvent;

    function init() {
      EventService
        .getEventsForUser(vm.userId)
        .success(populateEvents);
    }
    init();

    function populateEvents(events) {
      vm.events = events;
    }

    function editEvent() {
      $('#fullCalModal').modal();
    }
    
    function dropEvent(event) {
      EventService.createEventForUser(event, vm.userId);
    }

    function createEvent(start, end, calendar) {
      var title = prompt('Event Title:');
      if (title) {
        var editedEvent = {
          title: title,
          start: start,
          end: end,
          allDay: false
        };

        calendar.fullCalendar('renderEvent', editedEvent);
        EventService.createEvent(editedEvent);
      }
      calendar.fullCalendar('unselect');
    }

    function updateEvent(event) {
      EventService.updateEvent(event._id, sanitizeEvent(event))
    }

    function sanitizeEvent(event) {
      return {
        _id: event._id,
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay
      }
    }

  }
})();
