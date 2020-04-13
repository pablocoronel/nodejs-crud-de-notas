const helpers = {};

// para saber si está logueado (next es para middleware)
helpers.isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}

	// sino
	req.flash('error_msg', 'Not authorized');
	res.redirect('/users/singin');
};

module.exports = helpers;
