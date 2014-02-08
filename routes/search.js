// var db = require('mongoskin').db('localhost:27017/local', {safe:false});

var db = require('mongoskin').db('admin:password1@ds027759.mongolab.com:27759/heroku_app22039734', {safe:false});

exports.home = function(req, res){
  // get current queue data
  res.render('search', { title: 'User Device' }) // pass as a var 
};