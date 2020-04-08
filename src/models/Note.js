// Schema: es para modelar las colections, model: es para tener funciones que permiten interctura con la db
const { Schema, model } = require('mongoose');

// schema
const NoteSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// model
module.exports = model('Note', NoteSchema);
