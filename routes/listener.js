var db = require('mongoskin').db('localhost:27017/local', {safe:false});

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

