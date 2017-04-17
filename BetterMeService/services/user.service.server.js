module.exports = function (app, UserModel, EventModel, RegimenModel) {
  app.post("/api/user", createUser);
  app.post("/api/enlist/user/:userId/regimen/:regimenId", enlistUser);
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
    UserModel
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
    }
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
        RegimenModel.addCadetteToRegimen(regimenId, userId);
      })
      .then(function(regimen) {
        EventModel.createEventsFromArray(createBankedEventsForRegimen(userId, regimen))
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