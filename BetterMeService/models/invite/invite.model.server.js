module.exports = function () {

  var api = {
    createInvite: createInvite,
    findInviteById: findInviteById,
    updateInvite: updateInvite,
    deleteInvite: deleteInvite,
    deleteInvitesForRegimen: deleteInvitesForRegimen,
    deleteInvitesForUser: deleteInvitesForUser
  };

  var q = require('q');
  var mongoose = require('mongoose');

  var InviteSchema = require('./invite.schema.server')();
  var InviteModel = mongoose.model('InviteModel', InviteSchema);

  return api;

  function createInvite(invite) {
    return InviteModel.create(invite);
  }

  function findInviteById(inviteId) {
    var d = q.defer();

    InviteModel
      .findById(inviteId, function (err, invite) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(invite);
        }
      });

    return d.promise;
  }

  function updateInvite(inviteId, invite) {
    var d = q.defer();

    InviteModel
      .findOneAndUpdate({'_id': inviteId}, invite, {new: true}, function (err, invite) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(invite);
        }
      });

    return d.promise;
  }

  function deleteInvite(inviteId) {
    var d = q.defer();

    InviteModel
      .remove({'_id': inviteId}, function (err, status) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(status);
        }
      });

    return d.promise;
  }

  function deleteInvitesForRegimen(regimenId) {
    var d = q.defer();
    
    InviteModel
      .remove({_regimen: regimenId}, function (err, status) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(status);
        }
      });

    return d.promise;
  }

  function deleteInvitesForUser(userId) {
    var d = q.defer();
    
    InviteModel
      .remove({$or :[{_sender: userId}, {_recipient: userId}]}, function (err, status) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(status);
        }
      });

    return d.promise;
  }
};