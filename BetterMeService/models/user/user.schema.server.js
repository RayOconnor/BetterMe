module.exports = function () {
  var mongoose = require('mongoose');
  var ObjectId = mongoose.Schema.Types.ObjectId;
  
  var UserSchema = mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, lowercase: true, unique: true},
    password: {type: String},
    dateOfBirth: {type: Date},
    dateCreated: {type: Date},
    profileImageUrl: String,
    profileBio: String,
    admin: Boolean,
    coach: Boolean,
    scheduledEvents: [{type: ObjectId, ref: 'EventModel'}],
    bankedEvents: [{type: ObjectId, ref: 'EventModel'}],
    coachedRegimens: [{type: ObjectId, ref: 'RegimenModel'}],
    enlistedRegimens: [{type: ObjectId, ref: 'RegimenModel'}],
    sentInvites: [{type: ObjectId, ref: 'InviteModel'}],
    receivedInvites: [{type: ObjectId, ref: 'InviteModel'}],
    facebook: {
      id:    String,
      token: String
    }


  }, {collection: 'user'});

  return UserSchema;
};