// var db = require('mongoskin').db('localhost:27017/local', {safe:false});

var db = require('mongoskin').db('admin:password1@ds027479.mongolab.com:27479/heroku_app22047216', {safe:false});
var request = require('request');


exports.home = function(req, res){
	// get current queue data
	res.render('user', { title: 'Playlistr User Device' }) // pass as a var 
};

exports.home_post_handler = function(req, res){
	var search = req.body.search;
	req.session.search = search;
	var id = req.body.id;

	if (search != ''){
		// console.log(req.body.search + "req.body");
		// console.log(req.session.search + "req.session");
		res.redirect('/user/search')
	} else {
		// remove id from queue
	}
}

exports.search = function(req, res){
	var search = req.session.search
	// console.log(search + " search term")

	// yt vars
	var ytvid;
	var ytsplit;
	var ytlink;
	var ytthumb;
	var ytvtitle;
	var yttime;
	var videos = new Array();

	// soundcloud vars

	var sc_response = new Array();

	// rdio vars
	var rdio;
	var rdiolink;

	request('https://gdata.youtube.com/feeds/api/videos?q=' + search.replace(/ /g,'+') + '&orderby=viewCount&time=all_time&alt=json', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var bodyJSON = JSON.parse(body);

			// parse json for url to store
			ytvid = bodyJSON.feed.entry[0].id.$t

			ytsplit = ytvid.split("videos\/");
			ytlink = "http://www.youtube.com/embed/" + ytsplit[1] + "?autoplay=1";

			ytthumb = bodyJSON.feed.entry[0].media$group.media$thumbnail[3].url;
			ytvtitle = bodyJSON.feed.entry[0].title.$t;
			yttime = bodyJSON.feed.entry[0].media$group.yt$duration;

			// adds url to db
			// add id to db since its YT
			// db.collection('queue').insert({type: "Youtube", url: ytlink, title: ytvtitle, time: yttime});
			
			// db.collection('queue').find().toArray(function(err, result) {
			// 	if (err) throw err;
			// 	// console.log(result);
			// });
			// parse json for url to store
			
			var limits_of_array = 20;
			if(bodyJSON.feed.entry.length < limits_of_array){
				limits_of_array = bodyJSON.feed.entry.length;
			}


			for (var i = 0; i < limits_of_array; i++) {
				var current = bodyJSON.feed.entry[i];
				var vid = current.id.$t
				var split = vid.split("videos\/");
				var current_vid = {link : "http://www.youtube.com/embed/" + split[1] + "?autoplay=1",
					thumb : current.media$group.media$thumbnail[3].url, 
					vtitle : current.title.$t,
					type : "Youtube",
					time : current.media$group.yt$duration
				};
				videos.push(current_vid);
			};


			request('https://api.soundcloud.com/tracks.json?client_id=YOUR_CLIENT_ID&q=' + search.replace(/ /g,'%20'), function (error, response, body){
				var bodyJSON = JSON.parse(body);

				var limits_of_array = 20;
				if(bodyJSON.length < limits_of_array){
					limits_of_array = bodyJSON.length;
				}

				for (var i = 0; i < limits_of_array; i++) {
					var time = parseInt(bodyJSON[i].duration);
					time = Math.round(time/ 1000);
					console.log(bodyJSON[i]);
					var sc_data = {	sctrackid: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + bodyJSON[i].id + '&amp;auto_play=true',
									sctracktitle: bodyJSON[i].title,
									sctrackart: bodyJSON[i].artwork_url,
									scduration: time
					};
					sc_response.push(sc_data);
				}

				console.log(sc_response);
				res.render('search', { title: 'Search', query: search, ytresponse: videos, scresponse: sc_response});

			});

		}
	});
		
}

	


exports.search_post_handler = function(req, res){

	if(req.body.link && req.body.type){
		var time = req.body.time;

		// console.log(req.body.vtitle + "title");
		// console.log(req.body.time + "title");
		if(req.body.type = "Youtube"){
			time = req.body.time.seconds
		}


		db.collection('queue').insert({type: req.body.type, url: req.body.link, title: req.body.vtitle, time: req.body.time});
		db.collection('queue').find().toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
		});
	}

	res.redirect('/user');
}