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
      "findAllUsers": findAllUsers,
      "findUserByUsername": findUserByUsername,
      "findUserByCredentials": findUserByCredentials,
      "updateUser": updateUser,
      "deleteUser": deleteUser,
      "login": login,
      "logout": logout,
      "register": register,
      "isAdmin": isAdmin
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

    function login(user) {
      return $http.post("/api/login", user);
    }

    function logout() {
      return $http.post("/api/logout");
    }

    function register(user) {
      return $http.post("/api/register", user);
    }

    function isAdmin() {
      return $http.post('/api/user/isAdmin')
        .then(function (response) {
          return response.data;
        });
    }
    
  }
})();