const express = require('express'); // para server
const path = require('path'); //nodejs: rutas
const expressHandlebars = require('express-handlebars'); // para plantillas de vista
const morgan = require('morgan'); // para loger
const methodOverride = require('method-override'); // para usar PUT y DELETE en http
const flash = require('connect-flash'); // para enviar mensajes
const session = require('express-session'); // para guardar los mensajes enviados entre vistas

// Initials
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); // para que express sepa la ruta (multi os) de la carpeta
app.engine(
	'.hbs',
	expressHandlebars({
		defaultLayout: 'main',
		layoutsDir: path.join(app.get('views'), 'layouts'), // usa el set views
		partialsDir: path.join(app.get('views'), 'partials'), // usa el set views
		extname: '.hbs',
	})
);
app.set('view engine', '.hbs'); //usa el engine de arriba

// Middlewares
app.use(morgan('dev')); // sirve para log de la app en consola
app.use(express.urlencoded({ extended: false })); // los datos del formulario en el request se convierten a JSON
app.use(methodOverride('_method')); // Para usar el verbo Delete en http
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
); // configuracion de express-session
app.use(flash());

// Global variables (se ven en toda la aplicacion)
// usar un middleware propio
app.use((req, res, next) => {
	// locals guarda lo almacenado en flash, en las variables del servidor
	res.locals.success_msg = req.flash('success_msg');

	next();
});

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public'))); // node sabe donde está la carptea 'public

module.exports = app;
