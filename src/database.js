const mongoose = require('mongoose');

// conexion a la bd
// const NOTES_APP_MONGODB_HOST = process.env.NOTES_APP_MONGODB_HOST;
// const NOTES_APP_MONGODB_DATABASE = process.env.NOTES_APP_MONGODB_DATABASE;
const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env; // en .env

const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

// configuracion de mongoose
mongoose
	.connect(MONGODB_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then((db) => console.log('Database is connected'))
	.catch((err) => console.log(err));
