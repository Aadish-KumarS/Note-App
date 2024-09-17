import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required :true,
    unique: true,
  },
  password : {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  notes: [
    { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Note' 
    }
  ],
  deletedNotes: [
    { type: mongoose.Schema.Types.ObjectId, 
      ref: 'DeletedNote' 
    }
  ],
  isVerified:{
    type: Boolean,
    default: false
  },
  verificationToken: { type: String } 
})

export const User = mongoose.model('User', userSchema)