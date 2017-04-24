(function () {
  angular.module('BetterMe')
    .controller('loginController', loginController);

  function loginController($location, UserService) {
    var model = this;
    model.login = function (user) {
      UserService
        .login(user)
        .then(function (user) {
          if(user) {
            $location.url('/profile');
          }
        }, function (err) {
          model.error = err;
        });
    }
  }
})();