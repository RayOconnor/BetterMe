(function() {
  angular
    .module("BetterMe")
    .controller("inviteListController", inviteListController);

  function inviteListController($routeParams, $location, UserService, InviteService) {
    var vm = this;
    vm.userId = $routeParams['uid'];
    vm.deleteInvite = deleteInvite;
    vm.getPrettyFrequency = getPrettyFrequency;
    vm.redirectToRegimenDetails = redirectToRegimenDetails;

    function init() {
      var promise = UserService.findUserById(vm.userId);
      promise.success(function (user) {
        vm.user = user;
      });
    }

    init();

    function deleteInvite(inviteId) {
      InviteService.deleteInvite(inviteId)
        .success(function () {
          init();
        });
    }

    function redirectToRegimenDetails(regimen) {
      $location.url("/user/"+vm.userId+"/regimen/"+regimen._id);
    }

    function getPrettyFrequency(regimen) {
      switch (regimen.frequencyScope) {
        case "D":
          return "Daily";
        case "W":
          return "Weekly";
        default:
          return "Yearly";
      }
    }
  }
})();