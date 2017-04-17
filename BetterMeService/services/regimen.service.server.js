module.exports = function (app, RegimenModel, UserModel, EventModel, InviteModel) {
  app.post("/api/regimen", createRegimen);
  //app.get("/api/regimen", getRegimens);
  app.get("/api/regimen/user/:userId", getRegimensForUser);
  app.put("/api/regimen/:regimenId", updateRegimen);
  app.delete("/api/regimen/:regimenId", deleteRegimen);

  var _ = require('underscore');
  
  function createRegimen(req, res) {
    var newRegimen = req.body;
    RegimenModel
      .createRegimen(newRegimen)
      .then(function(regimen) {
        newRegimen = regimen;
        return UserModel.addRegimenToUsersCoachedRegimens(newRegimen);
      })
      .then(function() {
        res.json(newRegimen.toObject());
      })
      .catch(function(error) {
        res.sendStatus(500).send(error);;
      });
  }

  function getRegimensForUser(req, res) {
    var userId = req.params.userId;
    RegimenModel
      .getRegimensForUser(userId)
      .then(function(regimens) {
        res.json(regimens);
      })
  }

  function updateRegimen(req, res) {
    var regimenId = req.params.regimenId;
    var updatedRegimen = req.body;
    RegimenModel
      .updateRegimen(regimenId, updatedRegimen)
      .then(function(regimen) {
        res.json(regimen.toObject());
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function deleteRegimen(req, res) {
    var regimenId = req.params.regimenId;
    var regimenToDelete;
    RegimenModel
      .deleteRegimen(regimenId)
      .then(function(regimen) {
        regimenToDelete = regimen;
        UserModel.removeRegimenFromCoachedRegimens(regimen)
      })
      .then(function() {
        _.each(regimenToDelete.cadettes, function(cadetteId) {
          UserModel.removeRegimenFromEnlistedRegimens(cadetteId, regimenId);
        });
      })
      .then(function() {
        return EventModel.findEventsForRegimen(regimenId);
      })
      .then(function(events) {
        _.each(events, function (event) {
          EventModel.deleteEvent(event._id);
          UserModel.removeEventFromUser(event._user, event._id);
        });
      })
      .then(function() {
        return InviteModel.findInvitesForRegimen(regimenId);
      })
      .then(function(invites) {
        InviteModel.deleteInvitesForRegimen(regimenId);
        _.each(invites, function (invite) {
          if (invite._sender.toString() === invite._recipient.toString()) {
            UserModel.removeSameSenderInvites(invite._sender, invite._id);
          } else {
            UserModel.removeInviteFromReceivedInvites(invite._recipient, invite._id);
            UserModel.removeInviteFromSentInvites(invite._sender, invite._id);
          }
        });
        InviteModel.deleteInvitesForRegimen(regimenId);
      })
      .then(function(regimen) {
        res.json(regimen);
      })
      .catch(function (error) {
        res.sendStatus(500).send(error);
      });
    
  }
  
  

};