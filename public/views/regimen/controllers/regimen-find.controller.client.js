(function() {
  angular
    .module("BetterMe")
    .controller("regimenFindController", regimenFindController);

  function regimenFindController($routeParams, $location, RegimenService) {
    var vm = this;
    vm.userId = $routeParams['uid'];
    vm.updateDisplayedRegimens = updateDisplayedRegimens;
    vm.getCommitment = getCommitment;
    vm.redirectToRegimenDetails = redirectToRegimenDetails;
    vm.searchRegimen = "";
    vm.displayedRegimens = [];
    vm.allRegimens = [];

    function init() {
      var promise = RegimenService.findAllRegimens();
      promise.success(function (regimens) {
        vm.displayedRegimens = regimens;
        vm.allRegimens = regimens;
      });
    }

    init();

    function getCommitment(regimen) {
      return "Commitment: " + regimen.frequencyNumber + " times " + regimen.frequencyScope ;
    }

    function updateDisplayedRegimens() {
      vm.displayedRegimens = vm.allRegimens.filter(function (regimen) {
        return 0 <= regimen.title.toLowerCase().indexOf(vm.searchRegimen.toLowerCase()) ||
          0 <= regimen._coach.email.toLowerCase().indexOf(vm.searchRegimen.toLowerCase());
      })
    }

    function redirectToRegimenDetails(regimen) {
      $location.url("/user/"+vm.userId+"/regimen/"+regimen._id);
    }
  }
})();