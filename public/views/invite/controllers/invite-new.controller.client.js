(function() {
  angular
    .module("BetterMe")
    .controller("inviteNewController", inviteNewController);

  function inviteNewController($location, currentUser, RegimenService, UserService, InviteService) {
    var vm = this;
    vm.userId = currentUser._id;
    vm.updateDisplayedRegimens = updateDisplayedRegimens;
    vm.updateDisplayedUsers = updateDisplayedUsers;
    vm.logout = logout;
    vm.getCommitment = getCommitment;
    vm.redirectToRegimenDetails = redirectToRegimenDetails;
    vm.sendInvite = sendInvite;
    vm.getPrettyFrequency = getPrettyFrequency;
    vm.redirectToUserDetails = redirectToUserDetails;

    function init() {
      vm.invite = {};
      vm.searchRegimen = "";
      vm.displayedRegimens = [];
      vm.allRegimens = [];
      var promise = RegimenService.findAllRegimens();
      promise.success(function (regimens) {
        vm.displayedRegimens = regimens;
        vm.allRegimens = regimens;
      });
      var userPromise = UserService.findAllUsers();
      userPromise.success(function (users) {
        vm.displayedUsers = users;
        vm.allUsers = users;
      });
    }

    init();

    function sendInvite() {
      if(!vm.invite._recipient || !vm.invite._regimen) {
        vm.error = "Please make sure to select both a recipient and a regimen."
        return;
      }
      vm.invite._sender = vm.userId;
      InviteService
        .createInvite(vm.invite)
        .success(function (invite) {
          if (invite != null) {
            $location.url('/invite');
          } else {
            vm.error = 'invite not sent';
          }
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

    function updateDisplayedRegimens() {
      vm.displayedRegimens = vm.allRegimens.filter(function (regimen) {
        return 0 <= regimen.title.toLowerCase().indexOf(vm.regimenSearchTerm.toLowerCase()) ||
          0 <= regimen._coach.email.toLowerCase().indexOf(vm.regimenSearchTerm.toLowerCase());
      })
    }

    function updateDisplayedUsers() {
      vm.displayedUsers = vm.allUsers.filter(function (user) {
        return 0 <= user.email.toLowerCase().indexOf(vm.userSearchTerm.toLowerCase());
      })
    }

    function redirectToRegimenDetails(regimen) {
      $location.url("/regimen/"+regimen._id);
    }

    function redirectToUserDetails(user) {
      $location.url("/user/"+user._id);
    }

    function getCommitment(regimen) {
      return "Commitment: " + regimen.frequencyNumber + " times " + regimen.frequencyScope ;
    }

    function getPrettyFrequency(regimen) {
      switch (regimen.frequencyScope) {
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