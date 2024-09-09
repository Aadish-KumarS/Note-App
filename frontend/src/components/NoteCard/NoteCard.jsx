/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { IoTrashSharp } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegStar, FaStar } from "react-icons/fa";
import './noteCard.css'
import axios from 'axios';

const NoteCard = ({notes,setNotes}) => {
  

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
  };

  return (
    <>
      {notes.map((note,i) => {
          return(
            <div className="notescard" key={note._id}>
              <div>
                <div className="notescard-sec1">
                  <Link to={`edit/${note._id}`}>
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
                <Link to={`delete/${note._id}`}>
                  <IoTrashSharp className="icon delete-btn" />
                </Link>
              </div>
            </div>
          )
        })}
    </>
  )
}

export default NoteCard