(function() {
  angular
    .module("BetterMe")
    .controller("regimenDetailsController", regimenDetailsController);

  function regimenDetailsController($routeParams, $location, $sce, RegimenService, UserService) {
    var vm = this;
    vm.regimenId = $routeParams.rid;
    vm.userId = $routeParams.uid;
    vm.isUserEnlisted = false;
    vm.enlistUser = enlistUser;
    vm.unEnlistUser = unEnlistUser;
    vm.getTrustedHtml = getTrustedHtml;
    vm.isRegimenCoach = isRegimenCoach;
    vm.displayDate = displayDate;
    vm.updateRegimen = updateRegimen;
    vm.deleteRegimen = deleteRegimen;


    function init() {
      var promise = RegimenService.findRegimenById(vm.regimenId);
      promise.success(function (regimen) {
        renderRegimen(regimen);
        vm.isUserEnlisted = setEnlisted();
      });
    }

    init();

    function renderRegimen(regimen) {
      regimen.start = displayDate(regimen.start);
      regimen.end = displayDate(regimen.end);
      vm.regimen = regimen;
      vm.isCoach = vm.userId === regimen._coach;
    }
    
    function deleteRegimen() {
      RegimenService
        .deleteRegimen(vm.regimenId)
        .success(function (regimen) {
          renderRegimen(regimen);
          $location.url("/user/"+vm.userId+"/regimen");
        });
    }

    function updateRegimen(form) {
      if(!form.$valid) {
        return;
      }
      RegimenService
        .updateRegimen(vm.regimenId, vm.regimen)
        .success(function (regimen) {
          renderRegimen(regimen);
          $location.url("/user/"+vm.userId+"/regimen");
        });
    }

    function isRegimenCoach(coach) {
      return vm.userId === coach;
    }

    function setEnlisted() {
      return vm.regimen.cadettes.includes(vm.userId);
    }

    function getTrustedHtml(html) {
      return $sce.trustAsHtml(html);
    }
    
    function enlistUser() {
      UserService
        .enlistUser(vm.userId, vm.regimenId)
        .success(function (regimen) {
          renderRegimen(regimen);
          $location.url("/user/" + vm.userId + "/regimen");
        });
    }

    function unEnlistUser() {
      UserService
        .unEnlistUser(vm.userId, vm.regimenId)
        .success(function (regimen) {
          renderRegimen(regimen);
          $location.url("/user/" + vm.userId + "/regimen");
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