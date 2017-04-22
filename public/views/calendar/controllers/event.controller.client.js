(function() {
  angular
    .module("BetterMe")
    .controller("eventController", EventController);

  function EventController($routeParams, $location, EventService, UserService) {
    var vm = this;
    vm.userId = $routeParams.uid;
    vm.calendarDate = Date.now();
    vm.calendarScope = 'W';

    vm.moveEvent = moveEvent;
    vm.createEvent = createEvent;
    vm.updateEvent = updateEvent;
    vm.editEvent = editEvent;
    vm.dropEvent = dropEvent;
    vm.getJsonForEvent = getJsonForEvent;
    vm.redirectToRegimen = redirectToRegimen;
    vm.sanitizeEvent = sanitizeEvent;


    function init() {
      UserService
        .findUserById(vm.userId)
        .success(function (user) {
          vm.user = user;
          vm.events = user.scheduledEvents;
          if (vm.calendar) {
            updateDisplayedBankedEvents();
          }
        });
    }
    init();

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
      EventService.updateEvent(event._id, sanitizeEvent(event));
      vm.calendar.fullCalendar('updateEvent', event);

    }

    function getJsonForEvent(event) {
      return JSON.stringify(event);
    }

    function moveEvent(event) {
      EventService
        .moveEvent(event)
        .success(function () {
          init();
        });

    }

    function updateDisplayedBankedEvents() {
      var view = vm.calendar.fullCalendar( 'getView' );
      vm.displayedBankedEvents = vm.user.bankedEvents.filter(function (event) {
        var eventStart = new Date(event.start);
        return view.intervalStart._d < eventStart && view.intervalEnd._d > eventStart;
      });
    }

    function redirectToRegimen(regimenId) {
      $(".modal-backdrop").hide();
      $('body').removeClass('modal-open');
      $location.url("/user/"+vm.userId+"/regimen/"+regimenId);
    }


    function sanitizeEvent(event) {
      var newEvent = {};
      for (var k in event) {
        newEvent[k]=event[k];
      }
      delete newEvent.source;
      return newEvent;
    }

  }
})();
