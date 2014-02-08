// var db = require('mongoskin').db('localhost:27017/local', {safe:false});

var db = require('mongoskin').db('admin:password1@ds027759.mongolab.com:27759/heroku_app22039734', {safe:false});
var request = require('request');
var async = require('async');
var Rdio = require("rdio");

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

	// yt vars
	var ytvid;
	var ytsplit;
	var ytlink;
	var ytthumb;
	var ytvtitle;
	var yttime;

	// rdio vars
	var rdiolink;


	
	async.series([
		// call youtube API
		request('https://gdata.youtube.com/feeds/api/videos?q=' + search.replace(/ /g,'/') + '&orderby=viewCount&time=all_time&alt=json', function (error, response, body) {
			if (!error && response.statusCode == 200) {
			var bodyJSON = JSON.parse(body);
			console.log(body);


			// parse json for url to store
			ytvid = bodyJSON.feed.entry[0].id.$t

			ytsplit = ytvid.split("videos\/");
			ytlink = "http://www.youtube.com/embed/" + split[1] + "?autoplay=1";

			ytthumb = bodyJSON.feed.entry[0].media$group.media$thumbnail[3].url;
			ytvtitle = bodyJSON.feed.entry[0].title.$t;
			yttime = bodyJSON.feed.entry[0].media$group.yt$duration;

			// adds url to db
			// add id to db since its YT
			db.collection('queue').insert({type: "Youtube", url: ytlink, title: ytvtitle, time: yttime});
			db.collection('queue').find().toArray(function(err, result) {
				if (err) throw err;
				console.log(result);
			}),

		// RDIO API	
		var rdio = new Rdio(["s3q6u6tb6fvm8kgku5mkfvc7", "GD7gyma85e"]),
		rdio.call('search', {query: "let it go", types: "Track", method: "search"}, function (data, status, xhr){
			var bodyJSON = JSON.parse(data);
			rdiolink = bodyJSON.result[0].embedUrl;
			console.log(rdiolink);

		}),





		])

	

		res.render('search', { title: 'Search', query: search, response: ytthumb, ytvtitle: ytvtitle});
		}
	});
	
}

exports.search_post_handler = function(req, res){
	// handle input

	res.redirect('/user');
}