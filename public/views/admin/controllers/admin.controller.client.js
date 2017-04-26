(function () {
  angular
    .module('BetterMe')
    .controller('adminController', adminController);

  function adminController($location, UserService, RegimenService) {
    var vm = this;

    vm.deleteUser = deleteUser;
    vm.updateUser = updateUser;
    vm.deleteRegimen = deleteRegimen;
    vm.redirectToUserDetails = redirectToUserDetails;
    vm.updateDisplayedUsers = updateDisplayedUsers;
    vm.redirectToRegimenDetails = redirectToRegimenDetails;
    vm.updateDisplayedRegimens = updateDisplayedRegimens;
    vm.displayDate = displayDate;
    vm.logout = logout;

    function init() {
      UserService
        .findAllUsers()
        .success(function (users) {
          vm.displayedUsers = users;
          vm.allUsers = users;
      });
      RegimenService
        .findAllRegimens()
        .success(function (regimens) {
        vm.displayedRegimens = regimens;
        vm.allRegimens = regimens;
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

    function deleteRegimen(regimenId) {
      RegimenService
        .deleteRegimen(regimenId)
        .success(function () {
          $location.url("/admin");
        });
    }

    function logout() {
      UserService
        .logout()
        .then(
          function () {
            $location.url("/");
          });
    }

    function renderUsers(users) {
      vm.users = users;
    }

    function redirectToUserDetails(userId) {
      $location.url("admin/user/"+userId);
    }


    function redirectToRegimenDetails(regimenId) {
      $location.url("/regimen/"+regimenId);
    }

    function updateDisplayedUsers() {
      vm.displayedUsers = vm.allUsers.filter(function (user) {
        return 0 <= user.email.toLowerCase().indexOf(vm.userSearchTerm.toLowerCase());
      })
    }

    function updateDisplayedRegimens() {
      vm.displayedRegimens = vm.allRegimens.filter(function (regimen) {
        return 0 <= regimen.title.toLowerCase().indexOf(vm.regimenSearchTerm.toLowerCase()) ||
          0 <= regimen._coach.email.toLowerCase().indexOf(vm.regimenSearchTerm.toLowerCase());
      })
    }

    function displayDate(date) {
      var d = new Date(date);
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();
      return curr_month + "/" + curr_date + "/" + curr_year;
    }

  }
})();