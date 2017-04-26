(function(){
  angular
    .module("BetterMe")
    .controller("registerController", registerController);

  function registerController(UserService, $location, $rootScope) {
    var vm = this;
    vm.register = register;

    function init() {
      vm.user = {};
    }

    init();

    function register(user, form) {
      if (!form.$valid) {
        vm.error = "Please make sure that all the fields are valid."
        return;
      }
      UserService
        .register(user)
        .then(function (user) {
          $rootScope.currentUser = user;
          $location.url("/calendar");
        });
    }
  }
})();