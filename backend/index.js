import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import notesRouter from './routes/notes.route.js'
import deletedNotesRouter from './routes/deletedNotes.route.js'
import userRouter from './routes/user.route.js'


dotenv.config();

const app = express();
const PORT = 5001

//middleware
app.use(express.json());
app.use(cors());
app.use('/api/notes', notesRouter);
app.use('/api/deleted-notes',deletedNotesRouter);
app.use('/api/auth', userRouter);

mongoose.connect(process.env.MONGOOSE_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Connected to the database');
      console.log(`Server is running on ${PORT}`)
    })
  })
  .catch(error => {
    console.error(error.message)
  })
//Nv7moL9NfAnhoPGH