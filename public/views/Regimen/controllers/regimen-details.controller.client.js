(function() {
  angular
    .module("BetterMe")
    .controller("regimenDetailsController", regimenDetailsController);

  function regimenDetailsController($routeParams, RegimenService) {
    var vm = this;
    vm.regimenId = $routeParams.rid;

    function init() {
      var promise = RegimenService.findRegimenById(vm.regimenId);
      promise.success(function (regimen) {
        vm.regimen = regimen;
      });
    }

    init();
  }
})();