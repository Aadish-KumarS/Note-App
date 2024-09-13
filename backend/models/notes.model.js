import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    default: "Untitled"
  },
  content: {
    type: String,
    required: true,
    default: "What's on your mind?"
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
    default: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now, 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true, 
})

// Add a pre-save hook to update the `updatedAt` field before saving
notesSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export const Note = mongoose.model('Note', notesSchema);

