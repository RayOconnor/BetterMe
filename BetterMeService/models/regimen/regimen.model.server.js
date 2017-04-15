module.exports = function () {

  var api = {
    createRegimen: createRegimen,
    findRegimenById: findRegimenById,
    getRegimensForCoach: getRegimensForCoach,
    addRegimenToUsersCoachedRegimens: addRegimenToUsersCoachedRegimens,
    updateRegimen: updateRegimen,
    deleteRegimen: deleteRegimen
  };

  var q = require('q');
  var mongoose = require('mongoose');

  var RegimenSchema = require('./regimen.schema.server')();
  var RegimenModel = mongoose.model('RegimenModel', RegimenSchema);

  return api;

  function createRegimen(regimen) {
    return RegimenModel.create(regimen);
  }

  function addRegimenToUsersCoachedRegimens(regimen) {
    var d = q.defer();

    RegimenModel
      .findById(regimen._coach, function (err, coach) {
        if(err) {
          d.reject(err);
        } else {
          coach.coachedRegimens.push(regimen._id);
          coach.save();
          d.resolve(regimen);
        }
      });

    return d.promise;
  }

  function findRegimenById(regimenId) {
    var d = q.defer();

    RegimenModel
      .findById(regimenId, function (err, regimen) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(regimen);
        }
      });

    return d.promise;
  }

  function getRegimensForCoach(coachId) {
    var d = q.defer();

    RegimenModel
      .find({ _coach: coachId }, function (err, regimens) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(regimens);
        }
      });

    return d.promise;
  }

  function updateRegimen(regimenId, regimen) {
    var d = q.defer();

    RegimenModel
      .findOneAndUpdate({'_id': regimenId}, regimen, function (err, regimen) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(regimen);
        }
      });

    return d.promise;
  }

  function deleteRegimen(regimenId) {
    var d = q.defer();

    RegimenModel
      .remove({'_id': regimenId}, function (err, status) {
        if(err) {
          d.reject(err);
        } else {
          d.resolve(status);
        }
      });

    return d.promise;
  }
};