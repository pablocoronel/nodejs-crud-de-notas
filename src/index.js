require('dotenv').config(); // carga el archivo .env

const app = require('./server');
require('./database');

// process.env accede a las variables del sistema
console.log(process.env.TESTING);

app.listen(app.get('port'), () => {
	console.log('server on port', app.get('port'));
});
