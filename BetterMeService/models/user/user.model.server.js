module.exports = function () {

  var api = {
    createUser: createUser,
    findUserById: findUserById,
    addEventToUser: addEventToUser,
    addInviteToSender: addInviteToSender,
    addInviteToReceiver: addInviteToReceiver,
    addRegimenToUsersCoachedRegimens: addRegimenToUsersCoachedRegimens,
    findUserByEmail: findUserByEmail,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
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

};