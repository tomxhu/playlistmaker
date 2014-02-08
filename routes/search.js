// var db = require('mongoskin').db('localhost:27017/local', {safe:false});

var db = require('mongoskin').db('admin:5Ct9vgx6M-g5@mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/playlist', {safe:false});

exports.home = function(req, res){
  // get current queue data
  res.render('search', { title: 'User Device' }) // pass as a var 
};