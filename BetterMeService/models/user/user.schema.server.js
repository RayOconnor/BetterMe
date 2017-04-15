module.exports = function () {
  var mongoose = require('mongoose');
  var ObjectId = mongoose.Schema.Types.ObjectId;
  
  var UserSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    dateCreated: {type: Date},
    profileImageUrl: String,
    profileBio: String,
    admin: Boolean,
    coach: Boolean,
    scheduledEvents: [{type: ObjectId, ref: 'EventModel'}],
    bankedEvents: [{type: ObjectId, ref: 'EventModel'}],
    coachedRegimens: [{type: ObjectId, ref: 'RegimenModel'}],
    enlistedRegimens: [{type: ObjectId, ref: 'RegimenModel'}]
  }, {collection: 'user'});

  return UserSchema;
};