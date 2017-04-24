
(function () {
  angular
    .module("BetterMe")
    .config(configuration);

  function configuration($routeProvider) {
    $routeProvider
      .when("/login", {
        templateUrl: 'views/user/templates/login.view.client.html',
        controller: 'loginController',
        controllerAs: 'model'
      })
      .when("/register",{
        templateUrl: 'views/user/templates/register.view.client.html',
        controller: 'registerController',
        controllerAs: 'model'
      })
      .when("/profile",{
        templateUrl: 'views/user/templates/profile.view.client.html',
        controller: 'profileController',
        controllerAs: 'model',
        resolve: {
          currentUser: checkLogin
        }
      })
      .when("/user/:uid",{
        templateUrl: 'views/user/templates/profile-display.view.client.html',
        controller: 'profileDisplayController',
        controllerAs: 'model'
      })
      .when("/calendar",{
        templateUrl: 'views/calendar/templates/calendar.view.client.html',
        controller: 'eventController',
        controllerAs: 'model',
        resolve: {
          currentUser: checkLogin
        }
      })
      .when("/regimen/find",{
        templateUrl: 'views/regimen/templates/regimen-find.view.client.html',
        controller: 'regimenFindController',
        controllerAs: 'model',
        resolve: {
          currentUser: checkLogin
        }
      })
      .when("/regimen", {
        templateUrl: 'views/regimen/templates/regimen-list.view.client.html',
        controller: 'regimenListController',
        controllerAs: 'model',
        resolve: {
          currentUser: checkLogin
        }
      })
      .when("/regimen/new",{
        templateUrl: 'views/regimen/templates/regimen-new.view.client.html',
        controller: 'regimenNewController',
        controllerAs: 'model',
        resolve: {
          currentUser: checkLogin
        }
      })
      .when("/regimen/:rid",{
        templateUrl: 'views/regimen/templates/regimen-details.view.client.html',
        controller: 'regimenDetailsController',
        controllerAs: 'model',
        resolve: {
          currentUser: checkLogin
        }
      })
      .when("/invite", {
        templateUrl: 'views/invite/templates/invite-list.view.client.html',
        controller: 'inviteListController',
        controllerAs: 'model',
        resolve: {
          currentUser: checkLogin
        }
      })
      .when("/invite/new", {
        templateUrl: 'views/invite/templates/invite-new.view.client.html',
        controller: 'inviteNewController',
        controllerAs: 'model',
        resolve: {
          currentUser: checkLogin
        }
      })
      .when("/google-calendar-help", {
        templateUrl: 'views/help/google-calendar-help.view.client.html'
      })
      .when("/admin", {
        templateUrl: 'views/admin/templates/admin.view.client.html',
        controller: 'adminController',
        controllerAs: 'model',
        resolve: {
          adminUser: isAdmin
        }
      })
      .when("/admin/user/:userId", {
        templateUrl: 'views/admin/templates/admin-user-edit.view.client.html',
        controller: 'adminUserEditController',
        controllerAs: 'model',
        resolve: {
          adminUser: isAdmin
        }
      })
      .otherwise({
        redirectTo: '/login'
      });
  }

  function checkLogin($q, UserService, $location) {
    var deffered = $q.defer();
    UserService
      .loggedin()
      .then(function (user) {
        if(user == '0') {
          deffered.reject();
          $location.url('/login')
        } else {
          deffered.resolve(user);
        }
      });
    return deffered.promise;
  }

  function isAdmin($q, UserService, $location) {
    var deffered = $q.defer();
    UserService
      .isAdmin()
      .then(function (user) {
        if(user == '0') {
          deffered.reject();
          $location.url('/profile')
        } else {
          deffered.resolve(user);
        }
      });
    return deffered.promise;
  }


})();
