import express from 'express';
import { getAllDeletedNotes, postDeletedNotes,deleteAllNotes } from '../controllers/deleteNotes.controller.js';

const router = express.Router();

router.get('/all',getAllDeletedNotes)
router.post('/post',postDeletedNotes)
router.delete('/delete-all',deleteAllNotes)

export default router