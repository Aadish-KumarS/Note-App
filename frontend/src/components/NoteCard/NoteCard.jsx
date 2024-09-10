/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { IoTrashSharp } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdOutlineRestorePage } from "react-icons/md";
import './noteCard.css'
import axios from 'axios';

const NoteCard = ({notes,setNotes,handleDeleteNote,isDeleted = false}) => {
  

  const handleSetImportant =  (note) => {
    try {
      const updatedNote = { ...note, isImportant: !note.isImportant };
      axios.put(`http://localhost:5001/api/notes/edit/${note._id}`, {
        ...note,
        isImportant: updatedNote.isImportant
      });
      setNotes((prevNotes) =>
        prevNotes.map((prevNote) =>
          prevNote._id === note._id 
            ? { ...prevNote, isImportant: updatedNote.isImportant } 
            : prevNote
        )
      );
    } catch (error) {
      console.error("Error updating note importance:", error);
    }
    console.log('yess')
  };

  return (
    <>
      {notes.map((note,i) => {
          return(
            <div className="notescard" key={note._id}>
              <div>
                {
                  !isDeleted && 
                  <div className="notescard-sec1">
                    <Link to={`/notes/edit/${note._id}`}>
                      <BsPencilSquare className="icon edit-btn" />
                    </Link>
                    {
                      note.isImportant 
                        ? <FaStar 
                            onClick={() => handleSetImportant(note)} 
                            className="icon star-btn" 
                          /> 
                        : <FaRegStar 
                            onClick={() => handleSetImportant(note)} 
                            className="icon star-btn" 
                          />
                    }
                    
                  </div>
                }

                <div className="notescard-sec2">
                  <div className="card_number">{i+1}</div>
                  <h1>{note.title}</h1>
                  <div className="notescard-sec2-content">
                    <p>{note.content}</p>
                  </div>
                </div>
              </div>
              <div className="notescard-sec3">
                {note.tags.map((tag,i) => {
                  return(
                    <p 
                      className="tag" 
                      key={i}
                      style={{backgroundColor: tag.color}}
                    >
                        {tag.name}
                    </p>
                  )
                })}
              </div>
              <div className="notescard-sec4">
                {
                  isDeleted 
                    ? <MdOutlineRestorePage className="icon restore-btn" />
                    : <IoTrashSharp onClick={(id)=> handleDeleteNote(note._id)} className="icon delete-btn" />
                }
                
              </div>
            </div>
          )
        })}
    </>
  )
}

export default NoteCard