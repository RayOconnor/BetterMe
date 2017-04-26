(function() {
  angular
    .module("BetterMe")
    .controller("regimenDetailsController", regimenDetailsController);

  function regimenDetailsController($rootScope, $routeParams, $location, $sce, currentUser, RegimenService, UserService) {
    var vm = this;
    vm.regimenId = $routeParams.rid;
    vm.userId = currentUser._id;
    vm.isUserEnlisted = false;
    vm.enlistUser = enlistUser;
    vm.unEnlistUser = unEnlistUser;
    vm.getTrustedHtml = getTrustedHtml;
    vm.displayDate = displayDate;
    vm.updateRegimen = updateRegimen;
    vm.deleteRegimen = deleteRegimen;
    vm.logout = logout;
    vm.getPrettyFrequency = getPrettyFrequency;
    
    function init() {
      var promise = RegimenService.findRegimenById(vm.regimenId);
      promise.success(function (regimen) {
        renderRegimen(regimen);
        initUserInfo(regimen);
      });
    }

    init();
    
    function deleteRegimen() {
      RegimenService
        .deleteRegimen(vm.regimenId)
        .success(function (regimen) {
          renderRegimen(regimen);
          $location.url("/regimen");
        });
    }

    function updateRegimen(form) {
      if(!form.$valid) {
        vm.error = "Please make sure that all the fields are valid."
        return;
      }
      RegimenService
        .updateRegimen(vm.regimenId, vm.regimen)
        .success(function (regimen) {
          renderRegimen(regimen);
          $location.url("/regimen");
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

    function enlistUser() {
      UserService
        .enlistUser(vm.userId, vm.regimenId)
        .success(function (regimen) {
          renderRegimen(regimen);
          $location.url("/regimen");
        });
    }

    function renderRegimen(regimen) {
      regimen.start = displayDate(regimen.start);
      regimen.end = displayDate(regimen.end);
      vm.regimen = regimen;
    }

    function unEnlistUser() {
      UserService
        .unEnlistUser(vm.userId, vm.regimenId)
        .success(function (regimen) {
          renderRegimen(regimen);
          $location.url("/regimen");
        });
    }

    function displayDate(date) {
      var d = new Date(date);
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();
      return curr_month + "/" + curr_date + "/" + curr_year;
    }

    function initUserInfo(regimen) {
      if (currentUser === '0') {
        vm.isLoggedIn = false;
        vm.isUserAdmin = false;
        vm.isAuthorizedToEdit = false;
        vm.isUserEnlisted = false;
      } else {
        vm.isLoggedIn = true;
        vm.isUserAdmin = currentUser.admin;
        vm.isAuthorizedToEdit = vm.isUserAdmin || vm.userId === regimen._coach;
        vm.isUserEnlisted = regimen.cadettes.includes(vm.userId);
      }

    }

    function getTrustedHtml(html) {
      return $sce.trustAsHtml(html);
    }


    function getPrettyFrequency() {
      if (!vm.regimen) {
        return "";
      }
      switch (vm.regimen.frequencyScope) {
        case "D":
          return "Daily";
        case "W":
          return "Weekly";
        default:
          return "Yearly";
      }
    }

  }
})();