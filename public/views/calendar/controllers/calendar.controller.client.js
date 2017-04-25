(function() {
  angular
    .module("BetterMe")
    .controller("eventController", EventController);

  function EventController($location, currentUser, UserService, EventService) {
    var vm = this;
    vm.userId = currentUser._id;
    vm.user = currentUser;
    vm.events = currentUser.scheduledEvents;
    vm.calendarDate = Date.now();
    vm.calendarScope = 'W';

    vm.logout = logout;
    vm.moveEvent = moveEvent;
    vm.createEvent = createEvent;
    vm.updateEvent = updateEvent;
    vm.deleteEvent = deleteEvent;
    vm.editEvent = editEvent;
    vm.dropEvent = dropEvent;
    vm.getJsonForEvent = getJsonForEvent;
    vm.redirectToRegimen = redirectToRegimen;
    vm.sanitizeEvent = sanitizeEvent;
    vm.getScopeFromView = getScopeFromView;

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
        EventService.createEventForUser(editedEvent, vm.user._id);
      }
      calendar.fullCalendar('unselect');
    }

    function updateEvent(event) {
      EventService.updateEvent(event._id, sanitizeEvent(event));
      vm.calendar.fullCalendar('updateEvent', event);

    }
    
    function deleteEvent(event) {
      EventService.deleteEvent(event._id)
      vm.calendar.fullCalendar('removeEvents', event._id);

    }

    function logout() {
      UserService
        .logout()
        .then(
          function () {
            $location.url("/");
          });
    }

    function moveEvent(event) {
      EventService
        .moveEvent(event)
        .success(function () {
          init();
        });
    }
    
    function getJsonForEvent(event) {
      return JSON.stringify(sanitizeEvent(event));
    }
    
    function updateDisplayedBankedEvents() {
      var view = vm.calendar.fullCalendar( 'getView' );
      vm.displayedBankedEvents = vm.user.bankedEvents.filter(function (event) {
        var eventStart = new Date(event.start);
        return view.intervalStart._d < eventStart &&
          view.intervalEnd._d > eventStart &&
          getScopeFromView(view.name) === event.frequencyScope;
      });
    }

    function redirectToRegimen(regimenId) {
      $(".modal-backdrop").hide();
      $('body').removeClass('modal-open');
      $location.url("/regimen/"+regimenId);
    }

    function getScopeFromView(viewScope) {
      switch(viewScope) {
        case "month":
          return 'M';
        case "agendaWeek":
          return 'W';
        case "agendaDay":
          return 'D';
        default:
          return "";
      }
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
