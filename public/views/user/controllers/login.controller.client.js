(function () {
  angular.module('BetterMe')
    .controller('loginController', loginController);

  function loginController($location, UserService) {
    var vm = this;
    vm.login = login;

    function login(user) {
      UserService
        .login(user)
        .then(function (user) {
          if(user) {
            $location.url('/calendar');
          }
        }, function () {
          vm.error = "Your email and password, don't appear to be in our systems, please make sure they are correct.";
        });
    }
  }
})();