// var db = require('mongoskin').db('localhost:27017/local', {safe:false});

var db = require('mongoskin').db('admin:password1@ds027759.mongolab.com:27759/heroku_app22039734', {safe:false});
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

	var sctrackid;
	var sctracktitle;
	var scduration;

	// rdio vars
	var rdio;
	var rdiolink;

	request('https://gdata.youtube.com/feeds/api/videos?q=' + search.replace(/ /g,'/') + '&orderby=viewCount&time=all_time&alt=json', function (error, response, body) {
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
			

			for (var i = 0; i < bodyJSON.feed.entry.length; i++) {
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
				sctrackid = bodyJSON[0].id;
				sctracktitle = bodyJSON[0].title;
				scduration = (bodyJSON[0].duration / 1000);
				console.log(sctrackid + " " + sctracktitle + " " + scduration);

				res.render('search', { title: 'Search', query: search, response: videos});

			});


		}
	});


	// async.series({
 //        yt: function(callback) {
 //        		request('https://gdata.youtube.com/feeds/api/videos?q=' + search.replace(/ /g,'/') + '&orderby=viewCount&time=all_time&alt=json', function (error, response, body) {
 //        			if (!error && response.statusCode == 200) {
 //        				var bodyJSON = JSON.parse(body);

 //        				// parse json for url to store
 //        				ytvid = bodyJSON.feed.entry[0].id.$t

 //        				ytsplit = ytvid.split("videos\/");
 //        				ytlink = "http://www.youtube.com/embed/" + ytsplit[1] + "?autoplay=1";

 //        				ytthumb = bodyJSON.feed.entry[0].media$group.media$thumbnail[3].url;
 //        				ytvtitle = bodyJSON.feed.entry[0].title.$t;
 //        				yttime = bodyJSON.feed.entry[0].media$group.yt$duration;

 //        				// adds url to db
 //        				// add id to db since its YT
 //        				// db.collection('queue').insert({type: "Youtube", url: ytlink, title: ytvtitle, time: yttime});
        				
 //        				// db.collection('queue').find().toArray(function(err, result) {
 //        				// 	if (err) throw err;
 //        				// 	// console.log(result);
 //        				// });

 //        			}
 //        		});
 //                callback(null, [ytvtitle, ytthumb]);
 //            },
 //        sc: function(callback) {
 //        		request('https://api.soundcloud.com/tracks.json?client_id=YOUR_CLIENT_ID&q=' + search.replace(/ /g,'%20'), function (error, response, body){
 //        			var bodyJSON = JSON.parse(body);
 //        			sctrackid = bodyJSON[0].id;
 //        			sctracktitle = bodyJSON[0].title;
 //        			scduration = (bodyJSON[0].duration / 1000);
 //        			//console.log(sctrackid + " " + sctracktitle + " " + scduration);
 //        		});
 //                callback(null, [sctrackid, sctracktitle]);
 //            },
 //    },
 //    function(err, response) {
 //        console.log(response);
 //        res.render('search', { title: 'Search', query: search, response: ytthumb, ytvtitle: ytvtitle});
 //    });
		
}

	


exports.search_post_handler = function(req, res){

	if(req.body.link && req.body.type){
		db.collection('queue').insert({type: req.body.type, url: req.body.type, title: req.body.vtitle, time: req.body.time});
		db.collection('queue').find().toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
		});
	}

	res.redirect('/user');
}