/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { IoTrashSharp } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdOutlineRestorePage } from "react-icons/md";
import { RiFileInfoLine } from "react-icons/ri";
import './noteCard.css'
import { deleteNote, handleRestoreOne, handleSetImportant } from "../../utils/eventHandlers";

const NoteCard = ({notes,setNotes,isDeleted = false}) => {

  const token = localStorage.getItem('authToken');
  

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
                            onClick={() => handleSetImportant(note,setNotes,token)} 
                            className="icon star-btn" 
                          /> 
                        : <FaRegStar 
                            onClick={() => handleSetImportant(note,setNotes,token)} 
                            className="icon star-btn" 
                          />
                    }
                    <Link to={'/construction'}>
                      <RiFileInfoLine className="icon preview-btn"  />
                    </Link>
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
                    ? <MdOutlineRestorePage  
                        className="icon restore-btn" 
                        onClick={() =>{ handleRestoreOne(note._id,setNotes)}}
                      />
                    : <IoTrashSharp 
                        onClick={()=> deleteNote(note._id,setNotes,token)} 
                        className="icon delete-btn" 
                      />
                }
                
              </div>
            </div>
          )
        })}
    </>
  )
}

export default NoteCard