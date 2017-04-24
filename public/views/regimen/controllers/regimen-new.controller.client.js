(function() {
  angular
    .module("BetterMe")
    .controller("regimenNewController", regimenNewController);

  function regimenNewController($location, currentUser, RegimenService, UserService) {
    var vm = this;
    vm.user = currentUser;
    vm.userId = currentUser._id;
    vm.regimen = {_coach: vm.userId};
    vm.createRegimen = createRegimen;
    vm.logout = logout;

    function createRegimen(form) {
      if(!form.$valid) {
        return;
      } else {
        RegimenService
          .createRegimen(vm.regimen)
          .success(function (regimen) {
            if (regimen != null) {
              $location.url('/regimen');
            } else {
              vm.error = 'regimen creation failed';
            }
          });
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