
(function(){
  angular
    .module("BetterMe")
    .controller("adminUserEditController", adminUserEditController);

  function adminUserEditController($routeParams, $location, UserService) {
    var vm = this;
    vm.userId = $routeParams.userId;
    vm.updateUser = updateUser;
    vm.deleteUser = deleteUser;
    vm.logout = logout;

    function init() {
      UserService
        .findUserById(vm.userId)
        .success(function (user) {
          vm.user = user;
          vm.user.dateOfBirth = displayDate(user.dateOfBirth);
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

    function updateUser(form) {
      if(!form.$valid) {
        vm.error = "Please make sure that all the fields are valid."
        return;
      }
      UserService
        .updateUser(vm.userId, vm.user)
        .success(function ()  {
          $location.url('/admin');
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

    function displayDate(date) {
      if (!date) {
        date = Date.now();
      }
      var d = new Date(date);
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();
      return curr_month + "/" + curr_date + "/" + curr_year;
    }
    
  }
})();