import mongoose from 'mongoose';

const deletedNoteSchema = new mongoose.Schema({
  _id : {
    type: String,
    required: true
  },
  title: { 
    type: String, 
    required: true 
  },
  content: {
    type: String, 
    required: true 
  },
  tags: {
    type: [
      {
        name: { type: String},
        color: { type: String, default: 'gray'}
      }
    ], 
    default: [],
  },
  isImportant: { 
    type: Boolean, 
    default: false 
  },
  tags: [
    { name: String,
      color: String 
    }
  ],
  deletedAt: { 
    type: Date, default: Date.now 
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export const DeletedNote = mongoose.model('DeletedNote', deletedNoteSchema);

