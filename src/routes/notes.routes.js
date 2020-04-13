const { Router } = require('express');
const router = Router();
const { isAuthenticated } = require('../helpers/auth'); // para dejar entrar si está logueado

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
router.get('/notes/add', isAuthenticated, renderNoteForm);
router.post('/notes/new-note', isAuthenticated, createNewNote);

// Listar
router.get('/notes', isAuthenticated, renderNotes);

// Editar
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);
router.put('/notes/edit/:id', isAuthenticated, updateNote);

// Borrar
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;
