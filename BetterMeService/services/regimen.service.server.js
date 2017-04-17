module.exports = function (app, RegimenModel, UserModel, EventModel, InviteModel) {
  app.post("/api/regimen", createRegimen);
  //app.get("/api/regimen", getRegimens);
  app.get("/api/regimen/user/:userId", getRegimensForUser);
  app.put("/api/regimen/:regimenId", updateRegimen);
  app.delete("/api/regimen/:regimenId", deleteRegimen);

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
        for (i = 0; i < regimenToDelete.cadettes.length; i++) {
          UserModel.removeRegimenFromEnlistedRegimens(regimenToDelete.cadettes[i]._id, regimenId);
        }
      })
      .then(function() {
        EventModel.deleteEventsForRegimen(regimenId);
      })
      .then(function() {
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