module.exports = function (app, userModel) {
  app.get("/api/events", getEvents);

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  var events = [
    { title: 'All Day Event', start: new Date(y, m, 1)},
    { title: 'Long Event', start: new Date(y, m, d-5), end: new Date(y, m, d-2)},
    { id: 999, title: 'Repeating Event', start: new Date(y, m, d-3, 16, 0), allDay: false }
  ];

  function getEvents(req, res) {
    res.json(events);
  }
};