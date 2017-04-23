(function() {
  angular
    .module("BetterMe")
    .controller("regimenListController", regimenListController);

  function regimenListController($location, currentUser) {
    var vm = this;
    vm.userId = currentUser._id;
    vm.user = currentUser;
    vm.getPrettyFrequency = getPrettyFrequency;
    vm.redirectToRegimenDetails = redirectToRegimenDetails;

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