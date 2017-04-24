(function() {
  angular
    .module("BetterMe")
    .controller("regimenListController", regimenListController);

  function regimenListController($location, currentUser, UserService) {
    var vm = this;
    vm.userId = currentUser._id;
    vm.user = currentUser;
    vm.getPrettyFrequency = getPrettyFrequency;
    vm.redirectToRegimenDetails = redirectToRegimenDetails;
    vm.logout = logout;

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

    function logout() {
      UserService
        .logout()
        .then(
          function () {
            $location.url("/");
          });
    }
  }
})();