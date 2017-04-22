(function(){
  angular
    .module("BetterMe")
    .factory('RegimenService', RegimenService);

  function RegimenService($http) {

    var api = {
      "createRegimen": createRegimen,
      "findAllRegimens": findAllRegimens,
      "findRegimenById": findRegimenById,
      "updateRegimen": updateRegimen,
      "deleteRegimen": deleteRegimen
    };
    return api;

    function createRegimen(regimen) {
      return $http.post("/api/regimen", regimen);
    }

    function findAllRegimens() {
      return $http.get("/api/regimen");
    }
    
    function findRegimenById(regimenId) {
      return $http.get("/api/regimen/" + regimenId);
    }
    
    function updateRegimen(regimenId, regimen) {
      return $http.put("/api/regimen/" + regimenId, regimen);
    }

    function deleteRegimen(regimenId) {
      return $http.delete("/api/regimen/" + regimenId);
    }

  }
})();