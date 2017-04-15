module.exports = function (app, RegimenModel, UserModel) {
  app.post("/api/regimen", createRegimen);
  //app.get("/api/regimen", getRegimens);
  app.get("/api/regimen/user/:userId", getRegimensForUser);
  app.put("/api/regimen/:regimenId", updateRegimen);

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

};