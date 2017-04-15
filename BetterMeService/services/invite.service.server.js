module.exports = function (app, InviteModel, UserModel) {
  app.post("/api/invite", createInvite);
  //app.get("/api/invite", getInvites);
  app.get("/api/invite/user/:userId", getInvitesForUser);
  app.put("/api/invite/:inviteId", updateInvite);

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
      });
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

};