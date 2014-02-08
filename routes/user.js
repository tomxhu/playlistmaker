var db = require('mongoskin').db('localhost:27017/local', {safe:false});

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
	res.render('search', { title: 'Search', query: search });
}

exports.search_post_handler = function(req, res){
	// handle input

	res.redirect('/user');
}