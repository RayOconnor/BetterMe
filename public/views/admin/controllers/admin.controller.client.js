(function () {
  angular
    .module('BetterMe')
    .controller('adminController', adminController);

  function adminController($location, UserService) {
    var vm = this;

    vm.deleteUser = deleteUser;
    vm.updateUser = updateUser;
    vm.redirectToUserDetails = redirectToUserDetails;
    vm.updateDisplayedUsers = updateDisplayedUsers;

    function init() {
      UserService.findAllUsers()
        .success(function (users) {
          vm.displayedUsers = users;
          vm.allUsers = users;
      });
    }

    init();

    function updateUser(user) {
      UserService
        .updateUser(user)
        .then(findAllUsers);
    }

    function findAllUsers() {
      UserService.
      findAllUsers()
        .then(renderUsers);
    }

    function deleteUser(userId) {
      UserService
        .deleteUser(userId)
        .then(function () {
          findAllUsers();
          $location.url("/admin");
        });
    }

    function renderUsers(users) {
      vm.users = users;
    }

    function redirectToUserDetails(userId) {
      $location.url("admin/user/"+userId);
    }

    function updateDisplayedUsers() {
      vm.displayedUsers = vm.allUsers.filter(function (user) {
        return 0 <= user.email.toLowerCase().indexOf(vm.userSearchTerm.toLowerCase());
      })
    }

  }
})();