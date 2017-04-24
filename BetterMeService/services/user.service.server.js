module.exports = function (app, UserModel, EventModel, RegimenModel) {
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;

  var bcrypt = require("bcrypt-nodejs");
  var _ = require('underscore');
  var randomstring = require('randomstring');

  var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'email', 'name']
  };

  passport.use(new LocalStrategy(localStrategy));
  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  app.post("/api/user", createUser);
  app.post("/api/login", passport.authenticate('local'), login);
  app.post('/api/loggedin', loggedin);
  app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: "/#/profile",
      failureRedirect: "/#/login"
    }));
  app.post("/api/logout", logout);
  app.post("/api/register", register);
  app.post('/api/isAdmin', isAdmin);
  app.post('/api/isOwner/:userId', isOwner);
  app.post("/api/enlist/user/:userId/regimen/:regimenId", enlistUser);
  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.delete("/api/enlist/user/:userId/regimen/:regimenId", unEnlist);

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function loggedin(req, res) {
    if (req.isAuthenticated()) {
      UserModel
        .findUserById(req.user._id)
        .then(function (user) {
          res.send(user);
        })
        .catch(function (error) {
          res.sendStatus(500).send(error);
        });
    } else {
      res.send('0');
    }

    //res.send(req.isAuthenticated() ? req.user : '0');
  }

  function logout(req, res) {
    req.logout();
    res.send(200);
  }

  function isAdmin(req, res) {
    res.send(req.isAuthenticated() && req.user.admin ? req.user : '0');
  }
  
  function isOwner(req, res) {
    res.send(req.isAuthenticated() && (req.params.userId === req.user._id) ? req.user : 0 )
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    UserModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  function localStrategy(email, password, done) {
    UserModel
      .findUserByEmail(email)
      .then(
        function(user) {
          if(user && bcrypt.compareSync(password, user.password)) {
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

  function facebookStrategy(token, refreshToken, profile, done) {
    
    UserModel
      .findUserByFacebookId(profile.id)
      .then(function(user) {
        if (user) {
          done(null, user);
        } else {
          UserModel
            .createUser(buildUserFromFacebookInfo(profile, token))
            .then(function (user) {
              done(null, user);
            })
        }
      })
      .catch(function (err) {
        console.log(err);
        done(err, null);
      });

  }
  
  function buildUserFromFacebookInfo(profile, token) {
    return {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      password: bcrypt.hashSync(randomstring.generate(20)),
      facebook: {
        id:    profile.id,
        token: token
      }
    }
  }

  function register (req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    UserModel
      .createUser(user)
      .then(function(user) {
        if(user) {
          req.login(user, function(err) {
            if(err) {
              res.status(400).send(err);
            } else {
              res.json(user);
            }
          });
        }
      }
    );
  }

  function createUser(req, res) {
    var newUser = req.body;
    UserModel
      .createUser(newUser)
      .then(function(user) {
        res.json(user);
      }, function (error) {
        res.sendStatus(500).send(error);
      });

  }

  function findUserById(req, res) {
    var uid = req.params.userId;
    UserModel
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
    } else {
      findAllUsers(req, res);
    }
  }
  
  function findAllUsers(req, res) {
    UserModel
      .findAllUsers()
      .then(function(users) {
        res.json(users);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function findUserByEmail(email, req, res) {
    UserModel
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
    UserModel
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
    newUser.password = bcrypt.hashSync(newUser.password);
    UserModel
      .updateUser(userId, newUser)
      .then(function(user) {
        res.json(user.toObject());
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }

  function deleteUser(req, res) {
    var userId = req.params.userId;
    UserModel
      .deleteUser(userId)
      .then(function(user) {
        res.json(user);
      }, function (error) {
        res.sendStatus(500).send(error);
      });
  }
  
  function enlistUser(req, res) {
    var userId = req.params.userId;
    var regimenId = req.params.regimenId;
    UserModel
      .addRegimenToUsersEnlistedRegimens(userId, regimenId)
      .then(function() {
        return RegimenModel.addCadetteToRegimen(regimenId, userId);
      })
      .then(function(regimen) {
        return EventModel.createEventsFromArray(createBankedEventsForRegimen(userId, regimen))
      })
      .then(function(events) {
        if(events.length > 0) {
          return UserModel.addEventsToUser(events[0]._user, _.map(events, function(event) {return event._id}));
        }
      })
      .then(function(events) {
        res.json(events)
      })
      .catch(function(error) {
        res.sendStatus(500).send(error);
      });
  }

  function unEnlist(req, res) {
    var userId = req.params.userId;
    var regimenId = req.params.regimenId;

    UserModel
      .removeRegimenFromEnlistedRegimens(userId, regimenId)
      .then(function() {
        return RegimenModel.removeCadetteFromRegimen(userId, regimenId);
      })
      .then(function() {
        return EventModel.findEventsForRegimenAndUser(regimenId, userId);
      })
      .then(function(events) {
        _.each(events, function (event) {
          EventModel.deleteEvent(event._id);
          UserModel.removeEventFromUser(event._user, event._id);
        });
      })
      .then(function (regimen) {
        res.json(regimen);
      })
      .catch(function(error) {
        res.sendStatus(500).send(error);
      });
  }

  function buildEventObject(userId, regimen, indexDate) {
    return {
      title: regimen.title,
      start: indexDate,
      frequencyScope: regimen.frequencyScope,
      dateCreated: Date.now(),
      allDay: false,
      color: regimen.color,
      _user: userId,
      _regimen: regimen._id
    }
  };

  function createBankedEventsForRegimen(userId, regimen) {
    var start = new Date(regimen.start).setHours(0, 0, 0, 0)
    var eventsToAdd = [];
    var indexDate = getSunday(start);
    while(indexDate <= regimen.end) {
      for (var i = 0; i < regimen.frequencyNumber; i++) {
        eventsToAdd.push(buildEventObject(userId, regimen, indexDate));
      }
      indexDate = incrementIndexDate(indexDate, regimen.frequencyScope);
    }
    return eventsToAdd;

  }

  function getSunday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day; // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  function incrementIndexDate(date, frequencyScope) {
    var result = new Date(date);
    if (frequencyScope === "D") {
      result.setDate(result.getDate() + 1);
    } else if (frequencyScope === "W") {
      result.setDate(result.getDate() + 7);
    } else { //Monthly
      result.setMonth(result.getMonth() + 1);
    }
    return result;
  }

  var newRegimen = {
    "title": "Gym Season",
    "description": "Going to the gym twice a week",
    "start": 1491700800000,
    "end": 1492236647111,
    "dateCreated": 1492236647111,
    "frequencyScope": "D",
    "frequencyNumber": 2,
    "cadettes": [],
    "_coach": "58f25edd1729d99ea433d13a"
  };

  function printEventDates(eventArray) {
    for (var i = 0; i < eventArray.length; i++) {
      console.log(eventArray[i].start.toString());
    }
  }


  var list = createBankedEventsForRegimen('123', newRegimen);

};