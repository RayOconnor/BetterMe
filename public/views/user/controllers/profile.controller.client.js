
(function(){
  angular
    .module("BetterMe")
    .controller("profileController", profileController);

  function profileController($routeParams, UserService) {
    var vm = this;
    var userId = $routeParams['uid'];

    function init() {
      var promise = UserService.findUserById(userId);
      promise.success(function(user){
        vm.user = user;
      });
    }
    init();

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