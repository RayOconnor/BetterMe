(function(){
  angular
    .module("BetterMe")
    .controller("registerController", registerController);

  function registerController(UserService, $location, $rootScope) {
    var vm = this;
    
    vm.register = function(user, form) {
      if(!form.$valid) {
        vm.error = "Please make sure that all the fields are valid."
        return;
      }
      UserService
        .register(user)
        .then(function (user) {
          $rootScope.currentUser = user;
          $location.url("/calendar");
        });
    };
    
    vm.createUser = function(user, form) {
      if(!form.$valid) {
        vm.error = "Please make sure that all the fields are valid."
        return;
      }

      UserService
        .createUser(user)
        .success(function (registerUser) {
          if (registerUser != null) {
            $location.url("/calendar");
          } else {
            vm.error = 'user not found';
          }
        });
    }
  }
})();