const userController = {};

// vista
userController.renderSingUpForm = (req, res) => {
	res.render('models/users/singup');
};

// procesamiento
userController.singUp = (req, res) => {
	res.send('registro');
};

// vista
userController.renderSingInForm = (req, res) => {
	res.render('models/users/singin');
};

// procesamiento
userController.singIn = (req, res) => {
	res.send('sing in');
};

// salir
userController.logout = (req, res) => {
	res.send('salir');
};

module.exports = userController;
