
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

    function init() {
      vm.user.dateOfBirth = displayDate(currentUser.dateOfBirth);
      vm.password1 = "";
      vm.password2 = "";
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

    function unregisterUser(userId) {
      UserService
        .unregisterUser(userId)
        .then(function () {
          $location.url('/');
        });
    }

    function updateUser(form) {
      if(!form.$valid && vm.password1 === vm.password2) {
        return;
      }
      UserService
        .updateUser(vm.userId, vm.user)
        .success(function (user)  {
          vm.user = user;
          vm.user.dateOfBirth = displayDate(currentUser.dateOfBirth)
        });
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