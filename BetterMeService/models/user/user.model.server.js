module.exports = function () {

  var api = {
    createUser: createUser,
    findUserById: findUserById,
    findUserByFacebookId: findUserByFacebookId,
    addEventToUser: addEventToUser,
    addInviteToSender: addInviteToSender,
    addInviteToReceiver: addInviteToReceiver,
    addRegimenToUsersCoachedRegimens: addRegimenToUsersCoachedRegimens,
    addRegimenToUsersEnlistedRegimens: addRegimenToUsersEnlistedRegimens,
    addEventsToUser: addEventsToUser,
    findUserByEmail: findUserByEmail,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    removeRegimenFromCoachedRegimens: removeRegimenFromCoachedRegimens,
    removeRegimenFromEnlistedRegimens: removeRegimenFromEnlistedRegimens,
    removeInviteFromSentInvites: removeInviteFromSentInvites,
    removeInviteFromReceivedInvites: removeInviteFromReceivedInvites,
    removeSameSenderInvites: removeSameSenderInvites,
    removeEventFromUser: removeEventFromUser,
    deleteUser: deleteUser
  };

  var q = require('q');
  var mongoose = require('mongoose');

  var UserSchema = require('./user.schema.server')();
  var UserModel = mongoose.model('UserModel', UserSchema);

  return api;

  function createUser(user) {
    if (!user.events) {
      user.events = [];
    }
    return UserModel.create(user);
  }

  function addEventToUser(event) {
    var d = q.defer();

    UserModel
      .findById(event._user, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          user.events.push(event._id);
          user.save();
          d.resolve(event);
        }
      });

    return d.promise;
  }

  function addRegimenToUsersCoachedRegimens(regimen) {
    var d = q.defer();

    UserModel
      .findById(regimen._coach, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          user.coachedRegimens.push(regimen._id);
          user.save();
          d.resolve(regimen);
        }
      });

    return d.promise;
  }

  function addRegimenToUsersEnlistedRegimens(userId, regimenId) {
    var d = q.defer();

    UserModel
      .findById(userId, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          user.enlistedRegimens.push(regimenId);
          user.save();
          d.resolve(user);
        }
      });

    return d.promise;
  }

  function addInviteToSender(invite) {
    var d = q.defer();

    UserModel
      .findById(invite._sender, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          user.sentInvites.push(invite._id);
          user.save();
          d.resolve();
        }
      });

    return d.promise;
  }

  function addInviteToReceiver(invite) {
    var d = q.defer();

    UserModel
      .findById(invite._recipient, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          user.receivedInvites.push(invite._id);
          user.save();
          d.resolve();
        }
      });

    return d.promise;
  }

  function addEventsToUser(userId, eventIds) {
    var d = q.defer();

    UserModel
      .findById(userId, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          user.bankedEvents = user.bankedEvents.concat(eventIds);
          user.save();
          d.resolve();
        }
      });

    return d.promise;
  }
  
  function findUserById(userId) {
    var d = q.defer();

    UserModel
      .findById(userId, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(user);
        }
      });

    return d.promise;
  }

  function findUserByFacebookId(facebookId) {
    return UserModel.findOne({'facebook.id': facebookId});
  }

  function findUserByEmail(email) {
    var d = q.defer();

    UserModel
      .findOne({'email': email}, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(user);
        }
      });

    return d.promise;
  }

  function findUserByCredentials(email, password) {
    var d = q.defer();

    UserModel
      .findOne({'email': email, 'password': password}, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(user);
        }
      });

    return d.promise;
  }

  function updateUser(userId, user) {
    var d = q.defer();

    UserModel
      .findOneAndUpdate({_id: userId}, user, {new: true}, function (err, updatedUser) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(updatedUser);
        }
      });

    return d.promise;
  }

  function deleteUser(userId) {
    var d = q.defer();

    UserModel
      .remove({'_id': userId}, function (err, status) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(status);
        }
      });

    return d.promise;
  }

  function removeRegimenFromCoachedRegimens(regimen) {
    var d = q.defer();

    UserModel
      .findById(regimen._coach, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          var index = user.coachedRegimens.indexOf(regimen._id);
          user.coachedRegimens.splice(index, 1);
          user.save();
          d.resolve(user);
        }
      });

    return d.promise;
  }

  function removeRegimenFromEnlistedRegimens(userId, regimenId) {
    var d = q.defer();

    UserModel
      .findById(userId, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          var index = user.enlistedRegimens.indexOf(regimenId);
          user.enlistedRegimens.splice(index, 1);
          user.save();
          d.resolve(user);
        }
      });

    return d.promise;
  }
  
  function removeInviteFromSentInvites(userId, inviteId) {
    var d = q.defer();

    UserModel
      .findById(userId, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          var index = user.sentInvites.indexOf(inviteId);
          user.sentInvites.splice(index, 1);
          user.save();
          d.resolve(user);
        }
      });

    return d.promise;
  }

  function removeInviteFromReceivedInvites(userId, inviteId) {
    var d = q.defer();

    UserModel
      .findById(userId, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          var index = user.receivedInvites.indexOf(inviteId);
          user.receivedInvites.splice(index, 1);
          user.save();
          d.resolve(user);
        }
      });

    return d.promise;
  }

  function removeSameSenderInvites(userId, inviteId) {
    var d = q.defer();

    UserModel
      .findById(userId, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          var index = user.receivedInvites.indexOf(inviteId);
          user.receivedInvites.splice(index, 1);
          index = user.sentInvites.indexOf(inviteId);
          user.sentInvites.splice(index, 1);
          user.save();
          d.resolve(user);
        }
      });

    return d.promise;
  }

  function removeEventFromUser(userId, eventId) {
    var d = q.defer();

    UserModel
      .findById(userId, function (err, user) {
        if(err) {
          d.reject(err);
        } else {
          var index = user.scheduledEvents.indexOf(eventId);
          if (index >= 0) {
            user.scheduledEvents.splice(index, 1);
          }
          index = user.bankedEvents.indexOf(eventId);
          if (index >= 0) {
            user.bankedEvents.splice(index, 1);
          }
          user.save();
          d.resolve(user);
        }
      });

    return d.promise;
  }

};