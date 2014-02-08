var request = require('request');
var sc = require('soundclouder');



exports.home = function(req, res){

	request("https://api.soundcloud.com/tracks.format?consumer_key=apigee&q=pompeii&filter=all&order=created_at")

	// console.log("sc.home called");
	// sc.init('9529333ca7e7b723cf10d9c4efb00712');
	// 	console.log("after init");

	// 	var searchTerm =

	// 	sc.get('/tracks,', {q: searchTerm}, function(tracks){
	// 		console.log(tracks);
	// 		res.render('soundcloud', { title: 'Soundcloud' });
	// 	});	
};