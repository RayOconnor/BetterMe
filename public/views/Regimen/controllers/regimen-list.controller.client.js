(function() {
  angular
    .module("BetterMe")
    .controller("regimenListController", regimenListController);

  function regimenListController(RegimenService) {
    var vm = this;
    vm.updateDisplayedRegimens = updateDisplayedRegimens;
    vm.getCommitment = getCommitment;
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
        return 0 <= regimen.title.indexOf(vm.searchRegimen) ||
          0 <= regimen._coach.email.indexOf(vm.searchRegimen);
      })
    }
  }
})();