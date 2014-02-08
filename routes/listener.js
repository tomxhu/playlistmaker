//var db = require('mongoskin').db('localhost:27017/local', {safe:false});

var db = require('mongoskin').db('heroku_app22038962:testpass1@mongodb://<dbuser>:<dbpassword>@ds027789.mongolab.com:27789/heroku_app22038962', {safe:false});

exports.home = function(req, res){
	db.collection('queue').find().toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
			res.render('listener', { title: 'Listening Device', response: result[0].url});
			db.collection('queue').remove(result[0],function(err){
					if (!err) console.log('entry deleted!');
					db.collection('queue').find().toArray(function(err, result) {
						console.log(result);
					});
				});
		});
	
};

