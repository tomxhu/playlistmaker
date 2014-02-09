//var db = require('mongoskin').db('localhost:27017/local', {safe:false});

var db = require('mongoskin').db('admin:password1@ds027479.mongolab.com:27479/heroku_app22047216', {safe:false});

exports.home = function(req, res){
	db.collection('queue').find().toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
			if (result.length == 0){
				// empty list of songs
				console.log("empty");
				res.render('listener', { title: 'Playlistr Listening Device', time: 5});
			} else {
				var strtime = result[0].time;
				console.log(strtime);
				var time = parseInt(strtime);
				console.log(time);
				res.render('listener', { title: 'Playlistr Listening Device', response: result[0].url, time: time});
				db.collection('queue').remove(result[0],function(err){
					if (!err) console.log('entry deleted!');
					db.collection('queue').find().toArray(function(err, result) {
						console.log(result);

					});
				});
			}
			
		});
	
};

