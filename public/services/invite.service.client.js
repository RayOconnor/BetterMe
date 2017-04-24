(function(){
  angular
    .module("BetterMe")
    .factory('InviteService', InviteService);

  function InviteService($http) {

    var api = {
      "createInvite": createInvite,
      "findInviteById": findInviteById,
      "findAllInvites": findAllInvites,
      "updateInvite": updateInvite,
      "deleteInvite": deleteInvite

    };
    return api;

    function createInvite(invite) {
      return $http.post("/api/invite", invite);
    }

    function findInviteById(inviteId) {
      return $http.get("/api/invite/"+inviteId);
    }

    function findAllInvites() {
      return $http.get("/api/invite");
    }

    function updateInvite(inviteId, invite) {
      return $http.put("/api/invite/"+inviteId, invite);
    }

    function deleteInvite(inviteId) {
      return $http.delete("/api/invite/"+inviteId);
    }

  }
})();