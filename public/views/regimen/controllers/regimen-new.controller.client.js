(function() {
  angular
    .module("BetterMe")
    .controller("regimenNewController", regimenNewController);

  function regimenNewController($location, currentUser, RegimenService) {
    var vm = this;
    vm.user = currentUser;
    vm.userId = currentUser._id;
    vm.regimen = {_coach: vm.userId};
    vm.createRegimen = createRegimen;

    function createRegimen(form) {
      if(!form.$valid) {
        return;
      } else {
        RegimenService
          .createRegimen(vm.regimen)
          .success(function (regimen) {
            if (regimen != null) {
              $location.url('/user/' + vm.userId + '/regimen');
            } else {
              vm.error = 'regimen creation failed';
            }
          });
      }
    }
  }
})();