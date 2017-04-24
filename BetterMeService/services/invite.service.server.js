module.exports = function (app, InviteModel, UserModel) {
  app.post("/api/invite", createInvite);
  app.get("/api/invite/:inviteId", findInviteById);
  app.get("/api/invite", findAllInvites);
  app.get("/api/invite/user/:userId", getInvitesForUser);
  app.put("/api/invite/:inviteId", updateInvite);
  app.delete("/api/invite/:inviteId", deleteInvite);

  function createInvite(req, res) {
    var newInvite = req.body;
    InviteModel
      .createInvite(newInvite)
      .then(function(invite) {
        newInvite = invite;
        return UserModel.addInviteToSender(newInvite);
      })
      .then(function() {
        return UserModel.addInviteToReceiver(newInvite);
      })
      .then(function() {
        res.json(newInvite.toObject());
      })
      .catch(function(err) {
        res.sendStatus(500).send(error);
      });
  }

  function findInviteById(req, res) {
    var inviteId = req.params.inviteId;
    InviteModel.findInviteById(inviteId)
      .then(function (invite) {
        res.json(invite);
      })
      .catch(function (error) {
        res.sendStatus(500).send(error);
      })
  }

  function findAllInvites(req, res) {
    InviteModel.findAllInvites()
      .then(function (invites) {
        res.json(invites);
      })
      .catch(function (error) {
        res.sendStatus(500).send(error);
      })
  }


  function getInvitesForUser(req, res) {
    var userId = req.params.userId;
    InviteModel
      .getInvitesForUser(userId)
      .then(function(invites) {
        res.json(invites);
      })
  }

  function updateInvite(req, res) {
    var inviteId = req.params.inviteId;
    var updatedInvite = req.body;
    InviteModel
      .updateInvite(inviteId, updatedInvite)
      .then(function(invite) {
        res.json(invite.toObject());
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function deleteInvite(req, res) {
    var inviteId = req.params.inviteId;
    InviteModel
      .deleteInvite(inviteId)
      .then(function(invite) {
        if (invite._sender.toString() === invite._recipient.toString()) {
          UserModel.removeSameSenderInvites(invite._sender, invite._id);
        } else {
          UserModel.removeInviteFromReceivedInvites(invite._recipient, invite._id);
          UserModel.removeInviteFromSentInvites(invite._sender, invite._id);
        }
      })
      .then(function(invite) {
        res.json(invite);
      })
      .catch(function (error) {
        res.sendStatus(500).send(error);
      });
  }

};