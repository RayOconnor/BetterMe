var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

app.use(session({
  secret: 'd94e76f86be453328e245d50521a9ba63f7b1b6a', // process.env.SESSION_SECRET
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var betterMeService = require("./BetterMeService/app.js");
betterMeService(app);

var port = process.env.PORT || 3000;

app.listen(port);