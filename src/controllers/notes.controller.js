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
	newNote.user = req.user._id; // guarda el id de userio para relacionar
	await newNote.save(); // se guarda en la bd, es una operacion asincrona

	req.flash('success_msg', 'Note added successfully'); // guarda el mensaje en el servidor
	res.redirect('/notes');
};

// Listar
notesController.renderNotes = async (req, res) => {
	// Busca en el modelo
	const notes = await Note.find({ user: req.user._id }) // solo las del usuario
		.sort({ createdAt: 'desc' }) // orden descendente
		.lean(); // es asincrono

	res.render('models/notes/all-notes', { notes }); // la data se pasa en un objeto
};

// Editar
notesController.renderEditForm = async (req, res) => {
	const note = await Note.findById(req.params.id).lean(); // busca en la bd, es asincrono

	// editar solo sus propias notas
	if (note.user != req.user._id) {
		req.flash('error_msg', 'Not authorized');
		return res.redirect('/notes');
	}

	res.render('models/notes/edit-note', { note }); // pasa el objeto a la vista
};

notesController.updateNote = async (req, res) => {
	const { title, description } = req.body;
	await Note.findByIdAndUpdate(req.params.id, { title, description });

	req.flash('success_msg', 'Note updated successfully'); // guarda el mensaje en el servidor
	res.redirect('/notes');
};

// Borrar
notesController.deleteNote = async (req, res) => {
	await Note.findByIdAndDelete(req.params.id); // busca por id y lo borra de la bd

	req.flash('success_msg', 'Note deleted successfully'); // guarda el mensaje en el servidor
	res.redirect('/notes'); // redirecciona a la vista de listar
};

module.exports = notesController;
