
(function(){
  angular
    .module("BetterMe")
    .controller("navController", navController);


  function navController($location, UserService) {
    var vm = this;
    vm.logout = logout;
    vm.isLoggedIn = false;

    function init() {
      loggedin();
    }
    init();

    function logout() {
      UserService
        .logout()
        .then(
          function() {
            $location.url("/");
          });
    }

    function loggedin() {
      UserService
        .loggedin()
        .then(function (user) {
          if (user !== '0') {
            vm.isLoggedIn = true;
          }
        })
    }

  }
})();