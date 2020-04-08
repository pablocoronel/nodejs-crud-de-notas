const express = require('express');
const path = require('path'); //nodejs
const expressHandlebars = require('express-handlebars');

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
app.set(express.urlencoded({ extended: false })); // los datos del formulario se convierten a JSON

// Global variables

// Routes
// ruta basica
app.get('/', (req, res) => {
	// res.send('hello world');
	res.render('index');
});

// Static files
app.use(express.static(path.join(__dirname, 'public'))); // node sabe donde está la carptea 'public

module.exports = app;
