import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MdOutlineCancel, MdOutlineSaveAs } from "react-icons/md";
import TextareaAutosize from 'react-textarea-autosize';
import { IoClose} from "react-icons/io5";
import TagColorPicker from "../../components/TagColorPicker/TagColorPicker";
import { FaRegStar, FaStar } from "react-icons/fa";
import { handleAddTag, handleDeleteTag, handleGoBack, handleSelectColor, handleSetImportant, handleTagClick } from "../../utils/eventHandlers";


const EditNote = () => {

  const {id} = useParams();
  const token = localStorage.getItem('authToken');
  const [editNote, setEditNote] = useState({
    title: "",
    content: "",
    tags: [
      {
        name: "",
        color: "#bfe7f6"
      }
    ]
  });
  const [activeTag, setActiveTag] = useState('')
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`http://localhost:5001/api/notes/get-one/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(res => {
      setEditNote(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },[])
  
  
  const handleSave = () => {
    axios.put(`http://localhost:5001/api/notes/edit/${id}`,editNote,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
        navigate('/notes')
      })
      .catch(err =>{
        console.error(err.message)
      })
  }


  return (
    <section className="editNote">
      <div className="editNote-title">
        <h1>Edit Your Notes...</h1>
        {
          editNote.isImportant 
            ? <FaStar 
                onClick={() => handleSetImportant(editNote,setEditNote)} 
                className="icon star-btn" 
              /> 
            : <FaRegStar 
                onClick={() => handleSetImportant(editNote,setEditNote)} 
                className="icon star-btn" 
              />
        }
      </div>
      <div  className="editNote-btn-container">
        <button onClick={handleSave}>
          Save
          <MdOutlineSaveAs className="icon save-btn"/>
        </button>
        <button onClick={() =>handleGoBack(navigate)}>
          Cancle <MdOutlineCancel className="icon delete-btn" />
        </button>
      </div>
      <div className="editNote_container">
        <div className="editNote-section1">
          <input 
            type="txt"
            value={editNote.title}
            onChange={e => {
              setEditNote(prev => ({...prev, title: e.target.value }))
            }}
          />
        </div>
        <div  className="editNote-section2">
          <TextareaAutosize 
            value={editNote.content}
            onChange={e => {
              setEditNote(prev => ({...prev, content: e.target.value }))
            }}
          />
        </div>

        <div className="editNote-section3">
          <TagColorPicker 
            handleAddTag={(tag) => handleAddTag(tag,setEditNote)}
            handleSelectColor={(color) => handleSelectColor(color,setEditNote,activeTag)}
            editNote={editNote}
          />
        </div>

        <div className="editNote-section4">
          {
            editNote.tags.map((tag,i) => {
              return(
                <div key={i} >
                  <button 
                    id={tag._id} 
                    className="tag" 
                    onClick={() => handleTagClick(tag._id,activeTag,setActiveTag)}
                    style={{backgroundColor:tag.color}}
                  > 
                    {tag.name}
                    <IoClose  
                      className="icon close-btn"
                      onClick={() => handleDeleteTag(tag._id,setEditNote)}
                    />
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>
      
    </section>
  )
}

export default EditNote