
(function(){
  angular
    .module("BetterMe")
    .controller("profileController", profileController);


  function profileController($routeParams, $location, $rootScope, UserService) {
    var vm = this;
    vm.userId = $routeParams['uid'];
    vm.logout = logout;

    function init() {
      var promise = UserService.findUserById(vm.userId);
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
        .updateUser(vm.userId, newUser)
        .success(renderUser);
    }

    function renderUser(user) {
      vm.user = user;
      console.log(user);
    }

    var user = UserService.findUserById(vm.userId);
    vm.user = user;

    console.log(user);
  }
})();