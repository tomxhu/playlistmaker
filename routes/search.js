// var db = require('mongoskin').db('localhost:27017/local', {safe:false});

var db = require('mongoskin').db('admin:password1@ds027479.mongolab.com:27479/heroku_app22047216', {safe:false});

exports.home = function(req, res){
  // get current queue data
  res.render('search', { title: 'User Device' }) // pass as a var 
};