
(function(){
  angular
    .module("BetterMe")
    .controller("profileController", profileController);


  function profileController($routeParams, $location, $rootScope, UserService) {
    var vm = this;
    var userId = $routeParams['uid'];
    vm.logout = logout;

    function init() {
      var promise = UserService.findUserById(userId);
      promise.success(function(user){
        vm.user = user;
      });
    }
    init();

    function logout() {
      UserService
        .logout()
        .then(
          function(response) {
            $rootScope.currentUser = null;
            $location.url("/");
          });
    }

      function updateUser(newUser) {
      UserService
        .updateUser(userId, newUser)
        .success(renderUser);
    }

    function renderUser(user) {
      vm.user = user;
      console.log(user);
    }

    var user = UserService.findUserById(userId);
    vm.user = user;

    console.log(user);
  }
})();