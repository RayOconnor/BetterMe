(function() {
  angular
    .module("BetterMe")
    .controller("regimenFindController", regimenFindController);

  function regimenFindController($location, currentUser, UserService, RegimenService) {
    var vm = this;
    vm.updateDisplayedRegimens = updateDisplayedRegimens;
    vm.logout = logout;
    vm.redirectToRegimenDetails = redirectToRegimenDetails;
    vm.getCommitment = getCommitment;

    function init() {
      initUserInfo();
      vm.searchRegimen = "";
      vm.displayedRegimens = [];
      vm.allRegimens = [];
      var promise = RegimenService.findAllRegimens();
      promise.success(function (regimens) {
        vm.displayedRegimens = regimens;
        vm.allRegimens = regimens;
      });
    }

    init();

    function logout() {
      UserService
        .logout()
        .then(
          function () {
            $location.url("/");
          });
    }

    function updateDisplayedRegimens() {
      vm.displayedRegimens = vm.allRegimens.filter(function (regimen) {
        return 0 <= regimen.title.toLowerCase().indexOf(vm.searchRegimen.toLowerCase()) ||
          0 <= regimen._coach.email.toLowerCase().indexOf(vm.searchRegimen.toLowerCase());
      })
    }

    function initUserInfo() {
      if (currentUser === '0') {
        vm.isLoggedIn = false;
        vm.isUserAdmin = false;
      } else {
        vm.isLoggedIn = true;
        vm.isUserAdmin = currentUser.admin;
      }
    }

    function getCommitment(regimen) {
      return regimen.frequencyNumber + " times " + getPrettyFrequency(regimen.frequencyScope);
    }


    function getPrettyFrequency(scope) {
      switch (scope) {
        case "D":
          return "Daily";
        case "W":
          return "Weekly";
        default:
          return "Yearly";
      }
    }

    function redirectToRegimenDetails(regimen) {
      $location.url("/regimen/"+regimen._id);
    }

  }
})();