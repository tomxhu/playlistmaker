//var db = require('mongoskin').db('localhost:27017/local', {safe:false});

var db = require('mongoskin').db('ulddd19c2s0d19ps:0f79cbd5fa6d41d4972dd5f6e40a6238@bua7fv2714ohgiui.mongo.clvrcld.net/bua7fv2714ohgiui', {safe:false});

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

