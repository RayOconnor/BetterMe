
(function(){
  angular
    .module("BetterMe")
    .controller("profileController", profileController);


  function profileController($routeParams, $location, currentUser, UserService) {
    var vm = this;
    vm.userId = currentUser._id;
    vm.user = currentUser;
    vm.updateUser = updateUser;
    vm.unregisterUser = unregisterUser;
    vm.logout = logout;

    function logout() {
      UserService
        .logout()
        .then(
          function() {
            $location.url("/");
          });
    }

    function unregisterUser(userId) {
      UserService
        .unregisterUser(userId)
        .then(function () {
          $location.url('/');
        });
    }

    function updateUser(form) {
      if(!form.$valid) {
        return;
      }
      UserService
        .updateUser(vm.userId, vm.user)
        .success(function (user)  {
          vm.user = user;
        });
    }
    
  }
})();