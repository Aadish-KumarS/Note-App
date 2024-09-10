import {DeletedNote} from '../models/deletedNotes.model.js'

export const  getAllDeletedNotes =  (async (req, res) => {
  try {
    const data = await DeletedNote.find({})

    res.status(200).json({
      success: true,
      count: data.length, 
      data: data
    })
  } catch (error) {
    console.log('Error fecting all deleted notes',error.message);
    res.status(404).json({
      success: false,
      message: error.message
    })
  }
})

export const  postDeletedNotes = ( async(req,res) => {
  try {
    const data = req.body
    const deletedNote = await DeletedNote.create({...data})

    res.status(200).json({
      success: true,
      count: data.length, 
      data: deletedNote
    })
  } catch (error) {
    console.log('Error posting deleted note',error.message);
    res.status(404).json({
      success: false,
      message: error.message
    })
  }
})

export const deleteAllNotes = async (req, res) => {
  try {
    await DeletedNote.deleteMany({});
    res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.log('Error deleting all deleted notes',error.message);
    res.status(404).json({
      success: false,
      message: error.message
    })
  }
}