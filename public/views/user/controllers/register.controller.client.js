(function(){
  angular
    .module("BetterMe")
    .controller("registerController", registerController);

  function registerController(UserService, $location, $rootScope) {
    var vm = this;

    function init() {
    }
    init();
    
    vm.register = function(user, form) {
      if(!form.$valid) {
        return;
      }
      UserService
        .register(user)
        .then(function (response) {
          var user = response.data;
          $rootScope.currentUser = user;
          $location.url("/user/" + user._id);
        });
    };
    
    vm.createUser = function(user, form) {
      if(!form.$valid) {
        return;
      }

      UserService
        .createUser(user)
        .success(function (registerUser) {
          if (registerUser != null) {
            $location.url('/user/' + registerUser._id);
          } else {
            vm.error = 'user not found';
          }
        });
    }
  }
})();