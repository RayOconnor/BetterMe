(function(){
  angular
    .module("BetterMe")
    .controller("profileDisplayController", profileDisplayController);


  function profileDisplayController($sce, $routeParams, $location, UserService) {
    var vm = this;
    vm.userId = $routeParams.uid;
    vm.logout = logout;
    vm.getTrustedHtml = getTrustedHtml;
    vm.redirectToRegimenDetails = redirectToRegimenDetails;
    
    function init() {
      vm.isLoggedIn = false;
      UserService
        .findUserById(vm.userId)
        .success(function (user) {
          vm.user = user;
        });
      UserService
        .loggedin()
        .then(function (user) {
          if (user !== '0') {
            vm.isLoggedIn = true;
          }
        })
    }
    init();
    
    function logout() {
      UserService
        .logout()
        .then(
          function () {
            $location.url("/");
          });
    }

    function redirectToRegimenDetails(regimenId) {
      $location.url("/regimen/"+regimenId);
    }

    function getTrustedHtml(html) {
      return $sce.trustAsHtml(html);
    }

  }
})();