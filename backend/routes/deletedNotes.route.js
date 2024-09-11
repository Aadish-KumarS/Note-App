import express from 'express';
import { getAllDeletedNotes, postDeletedNotes,deleteAllNotes,getOneDeletedNote, deleteOne } from '../controllers/deleteNotes.controller.js';

const router = express.Router();

router.get('/all',getAllDeletedNotes);
router.get('/get-one/:id',getOneDeletedNote);
router.post('/post',postDeletedNotes);
router.delete('/delete-all',deleteAllNotes);
router.delete('/delete-one/:id',deleteOne);

export default router