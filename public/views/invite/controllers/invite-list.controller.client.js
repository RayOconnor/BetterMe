(function() {
  angular
    .module("BetterMe")
    .controller("inviteListController", inviteListController);

  function inviteListController($location, currentUser, UserService, InviteService) {
    var vm = this;
    vm.userId = currentUser._id;
    vm.user = currentUser;
    vm.deleteInvite = deleteInvite;
    vm.getPrettyFrequency = getPrettyFrequency;
    vm.redirectToRegimenDetails = redirectToRegimenDetails;

    function deleteInvite(inviteId) {
      InviteService.deleteInvite(inviteId)
        .success(function () {
          UserService
            .loggedin()
            .then(function (user) {
              if (user != '0') {
                vm.user = user;
              }
            });
        });
    }

    function redirectToRegimenDetails(regimen) {
      $location.url("/regimen/"+regimen._id);
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