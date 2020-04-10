const notesController = {};

// Modelo
const Note = require('../models/Note');

// Crear
notesController.renderNoteForm = (req, res) => {
	res.render('models/notes/new-note');
};

notesController.createNewNote = async (req, res) => {
	const { title, description } = req.body;

	// Guardar en bd
	const newNote = new Note({ title, description });
	await newNote.save(); // se guarda en la bd, es una operacion asincrona

	res.send('new note');
};

// Listar
notesController.renderNotes = async (req, res) => {
	// Busca en el modelo
	const notes = await Note.find().lean(); // es asincrono

	res.render('models/notes/all-notes', { notes }); // la data se pasa en un objeto
};

// Editar
notesController.renderEditForm = (req, res) => {
	res.send('edit');
};

notesController.updateNote = (req, res) => {
	res.render('update');
};

// Borrar
notesController.deleteNote = (req, res) => {
	res.render('delete');
};

module.exports = notesController;
