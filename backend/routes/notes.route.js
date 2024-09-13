import express from 'express';
import authenticateToken from '../middleware/auth.middleware.js'
import { createNote, getAllNotes, deleteNote, editNote, getOneNote } from '../controllers/createNotes.controller.js';

const router = express.Router();

router.post('/create',authenticateToken, createNote)
router.put('/edit/:id',authenticateToken, editNote)
router.get('/get-all',authenticateToken, getAllNotes)
router.get('/get-one/:id',authenticateToken, getOneNote)
router.delete('/delete/:id',authenticateToken, deleteNote)


export default router