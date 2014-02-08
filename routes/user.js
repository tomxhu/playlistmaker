var db = require('mongoskin').db('localhost:27017/local', {safe:false});
var request = require('request');

exports.home = function(req, res){
	// get current queue data
	res.render('user', { title: 'User Device' }) // pass as a var 
};

exports.home_post_handler = function(req, res){
	var search = req.body.search;
	req.session.search = search;
	var id = req.body.id;

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
		var vid = bodyJSON.feed.entry[0].id.$t

		var split = vid.split("videos\/");
		var link = "http://www.youtube.com/embed/" + split[1] + "?autoplay=1";

		var thumb = bodyJSON.feed.entry[0].media$group.media$thumbnail[3].url;
		var vtitle = bodyJSON.feed.entry[0].title.$t;

		// adds url to db
		db.collection('queue').insert({type: "Youtube", url: link, title: vtitle});
		db.collection('queue').find().toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
		});

		res.render('search', { title: 'Search', query: search, response: thumb, vtitle: vtitle});
		}
	});
	
}

exports.search_post_handler = function(req, res){
	// handle input

	res.redirect('/user');
}