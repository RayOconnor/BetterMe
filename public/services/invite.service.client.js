(function(){
  angular
    .module("BetterMe")
    .factory('InviteService', InviteService);

  function InviteService($http) {

    var api = {
      "createInvite": createInvite,
      "deleteInvite": deleteInvite
    };
    return api;

    function createInvite(invite) {
      return $http.post("/api/invite", invite);
    }

    function deleteInvite(inviteId) {
      return $http.delete("/api/invite/"+inviteId);
    }

  }
})();