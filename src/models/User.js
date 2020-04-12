const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

// Encriptar password: devuelv la pass encriptada
// encrypPassword es un metodo propio, methods permite agregar funciones propias
UserSchema.methods.encryptPassword = async (password) => {
	// algoritmo de cifrado
	// genSalt es asincrono, devuelve una promesa, entonces usa await para continuar la ejecucion mientras se resuelve, para usar 'await', la funcion debe ser "async"
	const salt = await bcrypt.genSalt(10);

	// cifrado
	return await bcrypt.hash(password, salt);
};

// devolver la pass
// usa una function No flecha, para acceder al this del Schema
UserSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password); // password: pasado, segundo: el de la BD
};

module.exports = model('User', UserSchema);
