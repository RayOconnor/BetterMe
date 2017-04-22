
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
      .when("/user/:uid",{
        templateUrl: 'views/user/templates/profile.view.client.html',
        controller: 'profileController',
        controllerAs: 'model'
      })
      .when("/user/:uid/calendar",{
        templateUrl: 'views/calendar/templates/calendar.view.client.html',
        controller: 'eventController',
        controllerAs: 'model'
      })
      .when("/user/:uid/regimen/find",{
        templateUrl: 'views/regimen/templates/regimen-find.view.client.html',
        controller: 'regimenFindController',
        controllerAs: 'model'
      })
      .when("/user/:uid/regimen", {
        templateUrl: 'views/regimen/templates/regimen-list.view.client.html',
        controller: 'regimenListController',
        controllerAs: 'model'
      })
      .when("/user/:uid/regimen/new",{
        templateUrl: 'views/regimen/templates/regimen-new.view.client.html',
        controller: 'regimenNewController',
        controllerAs: 'model'
      })
      .when("/user/:uid/regimen/:rid",{
        templateUrl: 'views/regimen/templates/regimen-details.view.client.html',
        controller: 'regimenDetailsController',
        controllerAs: 'model'
      })
      .when("/user/:uid/invite", {
        templateUrl: 'views/invite/templates/invite-list.view.client.html',
        controller: 'inviteListController',
        controllerAs: 'model'
      })
      .when("/user/:uid/invite/new", {
        templateUrl: 'views/invite/templates/invite-new.view.client.html',
        controller: 'inviteNewController',
        controllerAs: 'model'
      })
      .otherwise({
        templateUrl: 'views/user/templates/login.view.client.html',
        controller: 'loginController',
        controllerAs: 'model'
      });
  }

  var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    $http.get('/api/loggedin').success(function(user) {
      $rootScope.errorMessage = null;
      if (user !== '0') {
        $rootScope.currentUser = user;
        deferred.resolve();
      } else {
        deferred.reject();
        $location.url('/');
      }
    });
    return deferred.promise;
  };

  var checkAdmin = function ($q, $location) {
    var defer = $q.defer();
    UserService
      .isAdmin()
      .then(function (user) {
        if(user != '0') {
          defer.resolve(user);
        } else {
          defer.reject();
          $location.url('/profile');
        }
      });
    return defer.promise;
  };

})();
