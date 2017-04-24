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
            $location.url('/calendar');
          }
        }, function (err) {
          model.error = "Your email and password, don't appear to be in our systems, please make sure they are correct.";
        });
    }
  }
})();