module.exports = function () {
  var mongoose = require('mongoose');

  var UserSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    events: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}]
  }, {collection: 'user'});

  return UserSchema;
};