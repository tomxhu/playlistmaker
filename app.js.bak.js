
/**
 * Module dependencies.
 */

var express = require('express');
var mongoskin = require('mongoskin');
var request = require('request');
var home = require('./routes/home');
var listener = require('./routes/listener');
var user = require('./routes/user');
var search = require('./routes/search');
var passport = require('passport-rdio');
var RdioStrategy = require('passport-rdio').Strategy;
var http = require('http');
var path = require('path');


passport.use(new RdioStrategy({
	    consumerKey: 's3q6u6tb6fvm8kgku5mkfvc7',
	    consumerSecret: 'GD7gyma85e',
	    callbackURL: "http://partyplaylist-hack.herokuapp.com/"
	  },
	  function(token, tokenSecret, profile, done) {
	    User.findOrCreate({ rdioId: profile.id }, function (err, user) {
	      res.session.rdioToken = token;
	      res.session.rdioTokenSecret = tokenSecret;
	      res.session.rdioProfile = profile;
	    });
	  }
	));

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/auth/rdio',
  passport.authenticate('rdio'),
  function(req, res){
    // The request will be redirected to Rdio for authentication, so this
    // function will not be called.
  });

app.get('/', home.home);
app.post('/', home.home_post_handler);

app.get('/listener', listener.home);

app.get('/user', user.home);
app.post('/user', user.home_post_handler);

app.get('/user/search', user.search);
app.post('/user/search', user.search_post_handler);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
