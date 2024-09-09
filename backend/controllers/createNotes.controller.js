import { Note } from "../models/notes.model.js";

export const getAllNotes = async(req ,res) => {
  try {

    const data = await Note.find({})

    res.status(200).json({
      success: true,
      count: data.length, 
      data: data
    })

  } catch (error) {
    console.error(error.message);
    res.status(404).json({
      success: false,
      message: error.message
    })
  }
}

export const getOneNote = async(req, res) => {
  try {
    const {id} = req.params;
    const note = await Note.findById(id)

    if(!note){
      return res.status(404).json({success: false, message: "Item not found"})
    }
    res.status(200).json({success: true, data: note})

  } catch (error) {
    console.error(error.message);
    res.status(404).json({
      success: false, 
      message: error.message
    })
  }
}

export const createNote = async(req ,res) => {
  try {
    //destructuring from request body
    const {title, content,tags} = req.body;

    // validation 
    if(!title && !content) {
      return res.status(500).json({success: false, message: "Provide title or content"})
    }

    // new intance and model
    const newNote = {
      title: title,
      content: content,
      tags: tags
    }
    const note = await Note.create(newNote)

    res.status(200).json({success: true, data: note})
  } catch (error) {
    console.error(error.message);
    res.status(404).json({
      success: false,
      message: error.message
    })

  }
}

export const deleteNote = async (req,res) => {
  try {
    const {id} = req.params
    const deleteItem = await Note.findByIdAndDelete(id)

    if(!deleteItem){
      return res.status(404).send({
        success: false,
        message: "Item not Found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Successfully Deleted"
    })

  } catch (error) {
    console.error(error.message);
    res.status(404).json({
      success: false,
      message: error.message
    })
  }
}

export const editNote = async (req, res) => {
  try {
    const {id} = req.params;
    const updateFields = req.body;

    if(updateFields.newTag && updateFields.newTag.length > 0){
      updateFields.$push = {tags: {$each: updateFields.newTag}};
    } 

    if(updateFields.tagToDelete  && updateFields.tagToDelete.length > 0){
      updateFields.$pull = {tags: {$in: updateFields.tagToDelete}};
    } 

    const result = await Note.findByIdAndUpdate(id,updateFields,{ new: true })

    if(!result){
      return res.status(404).send({message: "Book not found"})
    }
  
    res.status(200).json({success: true, message: "Successfully Updated"})
  } catch (error) {
    console.error(error.message);
    res.status(404).json({
      success: false,
      message: error.message
    })
  }
}


// console.error(error.message);
//     res.status(404).json({
//       success: false,
//       message: error.message
//     })


// const {id} = req.params
// let data = req.body
// console.log(req.body)

// const updateFields = {};

// if(data.newTag && data.newTag.length > 0){
//   updateFields.$push = {tags: {$each: data.newTag}};
// } 

// if(data.tagToDelete  && data.tagToDelete.length > 0){
//   updateFields.$pull = {tags: {$in: data.tagToDelete}};
// } 

// const editItem = await Note.findByIdAndUpdate(id, 
//   updateFields,{ new: true }
// );

// if(!editItem){
//   return res.status(404).json({success: false, message: "No item found"})
// }
