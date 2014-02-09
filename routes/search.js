var db = require('mongoskin').db('localhost:27017/local', {safe:false});


exports.home = function(req, res){
  // get current queue data
  res.render('search', { title: 'User Device' }) // pass as a var 
};