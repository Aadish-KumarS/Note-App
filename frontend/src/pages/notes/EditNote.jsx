import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { MdOutlineSaveAs } from "react-icons/md";
import TextareaAutosize from 'react-textarea-autosize';
import { IoTrashSharp ,IoClose} from "react-icons/io5";
import TagColorPicker from "../../components/TagColorPicker/TagColorPicker";
import { FaRegStar, FaStar } from "react-icons/fa";


const EditNote = (props) => {

  const {handleAddTag,handleSelectColor,handleTagClick,handleDeleteTag} = props;
  const {id} = useParams();
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
    axios.get(`http://localhost:5001/api/notes/get-one/${id}`)
    .then(res => {
      setEditNote(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  },[])
  
  
  const handleSave = () => {
    axios.put(`http://localhost:5001/api/notes/edit/${id}`,editNote)
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
                onClick={() => handleSetImportant(note)} 
                className="icon star-btn" 
              /> 
            : <FaRegStar 
                onClick={() => handleSetImportant(note)} 
                className="icon star-btn" 
              />
        }
      </div>
      <div  className="editNote-btn-container">
        <button onClick={handleSave}>
          Save
          <MdOutlineSaveAs className="icon save-btn"/>
        </button>
        <button>
          <Link to={`/notes/delete/${id}`}>
            <IoTrashSharp className="icon delete-btn" />
          </Link>
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
            handleAddTag={(tag) => handleAddTag(tag,setEditNote,editNote)}
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