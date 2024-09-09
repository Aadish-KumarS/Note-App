import express from 'express';
import { createNote, getAllNotes, deleteNote, editNote, getOneNote } from '../controllers/createNotes.controller.js';

const router = express.Router();

router.post('/create', createNote)
router.put('/edit/:id', editNote)
router.get('/get-all', getAllNotes)
router.get('/get-one/:id', getOneNote)
router.delete('/delete/:id', deleteNote)


export default router