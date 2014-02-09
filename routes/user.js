var db = require('mongoskin').db('localhost:27017/local', {safe:false});
var request = require('request');

exports.home = function(req, res){
	// get current queue data
	res.render('user', { title: 'User Device' }) // pass as a var 
};

exports.home_get_handler = function(req, res){
	if(req.body.add){
		var to_add = req.body.add;
		alert(to_add);

		/*
		db.collection('queue').insert({type: "Youtube", url: link});
		db.collection('queue').find().toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
		});*/
	}
	/*var search = req.body.search;
	req.session.search = search;
	var id = req.body.id;

	if (search != ''){
		console.log(req.body.search + "req.body");
		console.log(req.session.search + "req.session");
		res.redirect('/user/search')
	} else {
		// remove id from queue
	}*/
}

exports.home_post_handler = function(req, res){
	var search = req.body.search;
	req.session.search = search;
	var id = req.body.id;

	if(req.body.link && req.body.type){
		db.collection('queue').insert({type: req.body.type, url: req.body.type});
		db.collection('queue').find().toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
		});
	}

	if (search != ''){
		console.log(req.body.search + "req.body");
		console.log(req.session.search + "req.session");
		res.redirect('/user/search')
	} else {
		// remove id from queue
	}
}

exports.search = function(req, res){
	var search = req.session.search
	console.log(search + " search term")
	
	
	request('https://gdata.youtube.com/feeds/api/videos?q=' + search.replace(/ /g,'/') + '&orderby=viewCount&time=all_time&alt=json', function (error, response, body) {
		if (!error && response.statusCode == 200) {
		var bodyJSON = JSON.parse(body);
		console.log(body);


		// parse json for url to store
		var videos = new Array();

		for (var i = 0; i < bodyJSON.feed.entry.length; i++) {
			var current = bodyJSON.feed.entry[i];
			var vid = current.id.$t
			var split = vid.split("videos\/");
			var current_vid = {link : "http://www.youtube.com/embed/" + split[1] + "?autoplay=1",
				thumb : current.media$group.media$thumbnail[3].url, 
				vtitle : current.title.$t,
				type : "Youtube"
			};
			videos.push(current_vid);
		};

		res.render('search', { title: 'Search', query: search, response: videos});
		}
	});
	
}

exports.search_post_handler = function(req, res){
	// handle input

	res.redirect('/user');
}