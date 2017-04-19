
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
      .when("/user/:uid/regimen",{
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

})();