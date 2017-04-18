(function(){
  angular
    .module("BetterMe")
    .controller("loginController", loginController);

  function loginController(UserService, $location, $rootScope) {
    var vm = this;
    vm.login = login;

    function init() {
    }

    init();
/*
    function login(user) {
      var promise = UserService
        .findUserByCredentials(user.username, user.password);
      promise.success(function (user) {
        if (user) {
          $location.url("/user/" + user._id);
        } else {
          vm.error = "User not found";
        }
      });
    }
*/
    function login(user) {
      UserService
        .login(user)
        .then(
          function (response) {
            var user = response.data;
            $rootScope.currentUser = user;
            $location.url("/user/" + user._id);
          });
    }
  }
    
})();
