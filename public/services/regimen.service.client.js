(function(){
  angular
    .module("BetterMe")
    .factory('RegimenService', RegimenService);

  function RegimenService($http) {

    var api = {
      "findAllRegimens": findAllRegimens,
      "findRegimenById": findRegimenById
    };
    return api;

    function findAllRegimens() {
      return $http.get("/api/regimen");
    }
    
    function findRegimenById(regimenId) {
      return $http.get("/api/regimen/" + regimenId);
    }

  }
})();