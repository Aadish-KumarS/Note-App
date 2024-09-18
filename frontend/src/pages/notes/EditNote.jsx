import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MdOutlineCancel, MdOutlineSaveAs } from "react-icons/md";
import { IoClose} from "react-icons/io5";
import TagColorPicker from "../../components/TagColorPicker/TagColorPicker";
import { FaRegStar, FaStar } from "react-icons/fa";
import { handleAddTag, handleDeleteTag, handleGoBack, handleSelectColor, handleSetImportant, handleTagClick } from "../../utils/eventHandlers";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

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
    axios.get(`https://mern-note-app-0vk7.onrender.com/api/notes/get-one/${id}`,
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
    axios.put(`https://mern-note-app-0vk7.onrender.com/api/notes/edit/${id}`,editNote,
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
                onClick={() => handleSetImportant(editNote,setEditNote,token)} 
                className="icon star-btn" 
              /> 
            : <FaRegStar 
                onClick={() => handleSetImportant(editNote,setEditNote,token)} 
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
          <ReactQuill
            theme="snow"
            value={editNote.content}
            onChange={value => setEditNote(prev => ({ ...prev, content: value }))}
            placeholder="What's on your mind?"
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'align': [] }],
                ['clean']                                         // remove formatting button
              ]
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
                    id={i} 
                    className="tag" 
                    onClick={() => {
                      handleTagClick(i,activeTag,setActiveTag)
                    }}
                    style={{backgroundColor:tag.color}}
                  > 
                    {tag.name}
                    <IoClose  
                      className="icon close-btn"
                      onClick={() => handleDeleteTag(i,setEditNote)}
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