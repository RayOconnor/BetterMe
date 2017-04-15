module.exports = function(app) {
  var EventModel = require('./models/event/event.model.server')();
  var UserModel = require('./models/user/user.model.server')();

  require("./services/event.service.server.js")(app, EventModel, UserModel);
  require("./services/user.service.server.js")(app, UserModel);

  var connectionString = 'mongodb://127.0.0.1:27017/betterme';

  if(process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
      process.env.MLAB_PASSWORD + "@" +
      process.env.MLAB_HOST + ':' +
      process.env.MLAB_PORT + '/' +
      process.env.MLAB_APP_NAME;
  }

  var mongoose = require("mongoose");
  mongoose.connect(connectionString);
  
}
