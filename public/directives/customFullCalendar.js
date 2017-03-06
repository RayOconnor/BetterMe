(function () {
  angular
    .module("BetterMe")
    .directive("customFullCalendar", customFullCalendarDir)
  
  function customFullCalendarDir() {
    function linkFunc(scope, element) {
      
      scope.$watch('model.events', function(events){
        if (events) {
          var calendar = element.fullCalendar(
            {
              /*
               header option will define our calendar header.
               left define what will be at left position in calendar
               center define what will be at center position in calendar
               right define what will be at right position in calendar
               */
              header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
              },
              /*
               defaultView option used to define which view to show by default,
               for example we have used agendaWeek.
               */
              defaultView: 'agendaWeek',
              /*
               selectable:true will enable user to select datetime slot
               selectHelper will add helpers for selectable.
               */
              selectable: true,
              selectHelper: true,
              /*
               when user select timeslot this option code will execute.
               It has three arguments. Start,end and allDay.
               Start means starting time of event.
               End means ending time of event.
               allDay means if events is for entire day or not.
               */
              select: function (start, end) {
                scope.model.createEvent(start, end, calendar);
              },
              /*
               editable: true allow user to edit events.
               */
              editable: true,
              droppable: true,
              drop: function(date) {
                var droppedEvent = JSON.parse(this.dataset.event);
                droppedEvent.start = date;
                scope.model.dropEvent(droppedEvent);
              },
              /*
               events is the main option for calendar.
               for demo we have added predefined events in json object.
               */
              events: events,
              eventClick: function (event) {
                scope.model.editedEvent = sanitizeEvent(event);
                scope.$apply();
                scope.model.editEvent();
              },
              eventDrop: scope.model.updateEvent,
              eventResize: scope.model.updateEvent
            });
          scope.model.calendar = calendar;
        }
      });

    }
    return {
      link: linkFunc
    };

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

