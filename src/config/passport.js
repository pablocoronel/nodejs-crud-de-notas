const passport = require('passport'); // el modulo
const localStrategy = require('passport-local').Strategy; // la manera de login (local, no de google)
const User = require('../models/User');

// Configurar la estrategia para login
passport.use(
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			// existe el email del usuario
			const user = await User.findOne({ email });
			if (!user) {
				return done(null, false, { message: 'Not user found' }); // (no hay error, no hay usuario paa guardar, mensaje)
			} else {
				// validar la contraseña recibida
				const match = await user.matchPassword(password);

				if (match) {
					return done(null, user); // (no hay error, guarda el usuario en la sesion)
				} else {
					return done(null, false, { message: 'Incorrect password' });
				}
			}
		}
	)
);

// guarda el usuario en la sesion
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// comprueba durante la navegacion si el usuario esta logueado
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});
