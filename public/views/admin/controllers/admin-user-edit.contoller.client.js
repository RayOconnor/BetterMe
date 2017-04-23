
(function(){
  angular
    .module("BetterMe")
    .controller("adminUserEditController", adminUserEditController);

  function adminUserEditController($routeParams, $location, UserService) {
    var vm = this;
    vm.userId = $routeParams.userId;
    vm.updateUser = updateUser;
    vm.deleteUser = deleteUser;

    function init() {
      UserService
        .findUserById(vm.userId)
        .success(function (user) {
          vm.user = user
        });
    }

    init();

    function deleteUser() {
      UserService
        .deleteUser(vm.user._id)
        .then(function () {
          $location.url("/admin");
        });
    }

    function updateUser() {
      UserService
        .updateUser(vm.userId, vm.user)
        .success(function ()  {
          $location.url('/admin');
        });
    }

  }
})();