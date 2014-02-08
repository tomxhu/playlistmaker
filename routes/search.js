// var db = require('mongoskin').db('localhost:27017/local', {safe:false});

var db = require('mongoskin').db('ulddd19c2s0d19ps:0f79cbd5fa6d41d4972dd5f6e40a6238@bua7fv2714ohgiui.mongo.clvrcld.net/bua7fv2714ohgiui', {safe:false});

exports.home = function(req, res){
  // get current queue data
  res.render('search', { title: 'User Device' }) // pass as a var 
};