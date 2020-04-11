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

	res.redirect('/notes');
};

// Listar
notesController.renderNotes = async (req, res) => {
	// Busca en el modelo
	const notes = await Note.find().lean(); // es asincrono

	res.render('models/notes/all-notes', { notes }); // la data se pasa en un objeto
};

// Editar
notesController.renderEditForm = async (req, res) => {
	const note = await Note.findById(req.params.id).lean(); // busca en la bd, es asincrono
	res.render('models/notes/edit-note', { note }); // pasa el objeto a la vista
};

notesController.updateNote = async (req, res) => {
	const { title, description } = req.body;
	await Note.findByIdAndUpdate(req.params.id, { title, description });

	res.redirect('/notes');
};

// Borrar
notesController.deleteNote = async (req, res) => {
	await Note.findByIdAndDelete(req.params.id); // busca por id y lo borra de la bd
	res.redirect('/notes'); // redirecciona a la vista de listar
};

module.exports = notesController;
