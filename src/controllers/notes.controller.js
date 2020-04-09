const notesController = {};

// Crear
notesController.renderNoteForm = (req, res) => {
	res.send('note add');
};

notesController.createNewNote = (req, res) => {
	res.send('new note');
};

// Listar
notesController.renderNotes = (req, res) => {
	res.send('list');
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
