const express = require('express');
const path = require('path'); //nodejs

// Initials
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); // para que express sepa la ruta (multi os) de la carpeta

// Middlewares
app.set(express.urlencoded({ extended: false })); // los datos del formulario se convierten a JSON

// Global variables

// Routes
// ruta basica
app.get('/', (req, res) => {
	res.send('hello world');
});

// Static files
app.use(express.static(path.join(__dirname, 'public'))); // node sabe donde está la carptea 'public

module.exports = app;
