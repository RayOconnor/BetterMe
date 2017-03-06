(function() {
  angular
    .module("BetterMe")
    .controller("EventController", EventController);

  function EventController(EventService) {
    var vm = this;
    vm.createEvent = createEvent;
    vm.updateEvent = updateEvent;
    vm.editEvent = editEvent;

    function init() {
      EventService
        .getEvents()
        .success(populateEvents);
    }
    init();

    function populateEvents(events) {
      vm.events = events;
      vm.editedEvent = {title: "bob"};
    }

    function editEvent() {
      $('#fullCalModal').modal();
    }

    function createEvent(start, end, calendar) {
      var title = prompt('Event Title:');
      if (title) {
        editEvent({
          title: title,
          start: start,
          end: end,
          allDay: false
        });
        
        calendar.fullCalendar('renderEvent', event);
        EventService.createEvent(event);
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
