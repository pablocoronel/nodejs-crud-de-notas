const { Router } = require('express');
const router = Router();

// funciones
const {
	renderNoteForm,
	createNewNote,
	renderNotes,
	renderEditForm,
	updateNote,
	deleteNote,
} = require('../controllers/notes.controller');

// Crear
router.get('/notes/add', renderNoteForm);
router.post('/notes/new-note', createNewNote);

// Listar
router.get('/notes', renderNotes);

// Editar
router.get('/notes/edit/:id', renderEditForm);
router.put('/notes/edit/:id', updateNote);

// Borrar
router.delete('/notes/delete/:id', deleteNote);

module.exports = router;
