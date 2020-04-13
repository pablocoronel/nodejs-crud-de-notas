const userController = {};
const User = require('../models/User');
const passport = require('passport');

// vista
userController.renderSingUpForm = (req, res) => {
	res.render('models/users/singup');
};

// procesamiento
userController.singUp = async (req, res) => {
	const errors = [];

	// tomo los datos recibidos desde el request
	const { name, email, password, confirm_password } = req.body;

	// validaciones
	if (password != confirm_password) {
		errors.push({ text: 'Passwords do not match' });
	}

	if (password.length < 4) {
		errors.push({ text: 'Passwords must be  at least 4 characters' });
	}

	// enviar errores a la misma vista
	if (errors.length > 0) {
		res.render('models/users/singup', {
			errors,
			name,
			email,
			password,
			confirm_password,
		});
	} else {
		// validaciones antes de guardar en BD
		const emailUser = await User.findOne({ email }); // si ya existe un usuario con el email ingresado
		if (emailUser) {
			req.flash('error_msg', 'The email is already in use');
			res.redirect('/users/singup');
		} else {
			// guardar el usuario en la BD
			const newUser = new User({ name, email, password });
			// cifrar el password: usa una funcion propia hecha en el modelo, cifra y lo asigna en password
			newUser.password = await newUser.encryptPassword(password);

			await newUser.save();

			req.flash('success_msg', 'You are registered'); // pasa un mansaje
			res.redirect('/users/singin');
		}
	}
};

// vista
userController.renderSingInForm = (req, res) => {
	res.render('models/users/singin');
};

// procesamiento del login
userController.singIn = passport.authenticate('local', {
	failureRedirect: '/users/singin', // si salio mal
	successRedirect: '/notes', // si se logueaga ok
	failureFlash: true, // usar flash
});

// salir
userController.logout = (req, res) => {
	req.logout(); // cerrar la sesion
	req.flash('success_msg', 'You are logged out now'); // enviarle un mensaje
	res.redirect('/users/singin'); //redireccion
};

module.exports = userController;
