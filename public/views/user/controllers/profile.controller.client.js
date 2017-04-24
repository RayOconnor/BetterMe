
(function(){
  angular
    .module("BetterMe")
    .controller("profileController", profileController);


  function profileController($location, currentUser, UserService) {
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
        vm.error = "Please make sure that all the fields are valid.";
        return;
      }
      vm.user.password = vm.password1;
      UserService
        .updateUser(vm.userId, vm.user)
        .success(function (user)  {
          vm.user = user;
          vm.user.dateOfBirth = displayDate(currentUser.dateOfBirth)
          $location.url("/user/"+vm.user._id);
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