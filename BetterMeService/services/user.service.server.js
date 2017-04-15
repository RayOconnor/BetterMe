module.exports = function (app, userModel) {
  app.post("/api/user", createUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    developerModel
      .findDeveloperById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  function localStrategy(username, password, done) {
    userModel
      .findUserByCredentials(username, password)
      .then(
        function(user) {
          if(user.username === username && user.password === password) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      );
  }

  function createUser(req, res) {
    var newUser = req.body;
    userModel
      .createUser(newUser)
      .then(function(user) {
        res.json(user);
      }, function (error) {
        res.sendStatus(500).send(error);
      });

  }

  function findUserById(req, res) {
    var uid = req.params.userId;
    userModel
      .findUserById(uid)
      .then(function(user) {
        res.json(user);
      }, function (error) {
        res.sendStatus(500).send(error);
      });

  }

  function findUser(req, res) {
    var email = req.query['email'];
    var password = req.query['password'];
    
    if(email && password) {
      findUserByCredentials(req, res);
    } else if(email) {
      findUserByEmail(email, req, res);
    }
  }

  function findUserByEmail(email, req, res) {
    userModel
      .findUserByEmail(email)
      .then(function(user) {
        res.json(user);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function findUserByCredentials(req, res) {
    var email = req.query['email'];
    var password = req.query['password'];
    userModel
      .findUserByCredentials(email, password)
      .then(function(user) {
        res.json(user);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function updateUser(req, res) {
    var userId = req.params.userId;
    var newUser = req.body;
    userModel
      .updateUser(userId, newUser)
      .then(function(user) {
        res.json(user.toObject());
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
      .deleteUser(userId)
      .then(function(user) {
        res.json(user);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

};