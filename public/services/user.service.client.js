(function(){
  angular
    .module("BetterMe")
    .factory('UserService', userService);

  function userService($http) {

    var api = {
      "createUser": createUser,
      "enlistUser": enlistUser,
      "unEnlistUser": unEnlistUser,
      "findUserById": findUserById,
      "findSparseUserById": findSparseUserById,
      "findAllUsers": findAllUsers,
      "findUserByUsername": findUserByUsername,
      "findUserByCredentials": findUserByCredentials,
      "updateUser": updateUser,
      "deleteUser": deleteUser,
      "login": login,
      "loggedin": loggedin,
      "logout": logout,
      "register": register,
      "isAdmin": isAdmin,
      "unregisterUser": unregisterUser
    };
    return api;

    function createUser(newUser) {
      return $http.post("/api/user", newUser);
    }
    
    function enlistUser(userId, regimenId) {
      return $http.post("/api/enlist/user/"+userId+"/regimen/"+regimenId);
    }

    function unEnlistUser(userId, regimenId) {
      return $http.delete("/api/enlist/user/"+userId+"/regimen/"+regimenId);
    }

    function findUserById(userId) {
      return $http.get("/api/user/"+userId);
    }

    function findSparseUserById(userId) {
      return $http.get("/api/user/"+userId+"?sparse=true");
    }

    function findAllUsers() {
      return $http.get("/api/user/");
    }

    function findUserByUsername(username) {
      return $http.get("/api/user?username="+username);
    }

    function findUserByCredentials(username, password) {
      return $http.get("/api/user?username="+username+"&password="+password);
    }

    function updateUser(userId, newUser) {
      return $http.put("/api/user/"+userId, newUser);
    }

    function deleteUser(userId) {
      return $http.delete("/api/user/"+userId);
    }

    function isAdmin() {
      return $http.post('/api/isAdmin')
        .then(function (response) {
          return response.data;
        });
    }

    function register(user) {
      return $http.post('/api/register', user)
        .then(function (response) {
          return response.data;
        });
    }

    function logout() {
      return $http.post('/api/logout')
        .then(function (response) {
          return response.data;
        });
    }

    function loggedin() {
      return $http.post('/api/loggedin')
        .then(function (response) {
          return response.data;
        });
    }

    function login(user) {
      return $http.post('/api/login', user)
        .then(function (response) {
          return response.data;
        });
    }
    
    function isOwner(userId) {
      return $http.post('/api/user/isOwner', userId)
        .then(function (response) {
          return response.data;
        });
    }

    function unregisterUser(userId) {
      return $http.delete('/api/user/'+userId)
        .then(function (response) {
          return response.data;
        });
    }
    
  }
})();