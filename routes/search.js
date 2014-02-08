// var db = require('mongoskin').db('localhost:27017/local', {safe:false});

var db = require('mongoskin').db('heroku_app22038962:testpass1@mongodb://<dbuser>:<dbpassword>@ds027789.mongolab.com:27789/heroku_app22038962', {safe:false});

exports.home = function(req, res){
  // get current queue data
  res.render('search', { title: 'User Device' }) // pass as a var 
};