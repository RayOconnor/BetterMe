(function(){
  angular
    .module("BetterMe")
    .controller("registerController", registerController);

  function registerController(UserService, $location) {
    var vm = this;

    function init() {
    }
    init();
    
    vm.createUser = function(user) {
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