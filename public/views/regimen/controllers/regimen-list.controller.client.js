(function() {
  angular
    .module("BetterMe")
    .controller("regimenListController", regimenListController);

  function regimenListController($routeParams, $location, UserService) {
    var vm = this;
    vm.userId = $routeParams['uid'];
    vm.getPrettyFrequency = getPrettyFrequency;
    vm.redirectToRegimenDetails = redirectToRegimenDetails;

    function init() {
      var promise = UserService.findUserById(vm.userId);
      promise.success(function (user) {
        vm.user = user;
      });
    }

    init();

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