
exports.home = function(req, res){
  res.render('home', { title: 'Playlstr' })
};

exports.home_post_handler = function(req, res){


	var password = req.body.password;
	if (password == "password"){
		res.redirect('/listener');
	} else {
		// incorrect password
	}
}