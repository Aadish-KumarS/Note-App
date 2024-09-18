import axios from 'axios'
import { useState } from 'react'
import '../styles/notes.css'
import { MdOutlineSaveAs } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import TagColorPicker from '../../components/TagColorPicker/TagColorPicker';
import { IoClose } from 'react-icons/io5';
import { handleAddTag, handleDeleteTag, handleSelectColor, handleTagClick } from '../../utils/eventHandlers';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const CreateNote = () => {

  const navigate  = useNavigate();
  const [newNote, setNewNote] = useState({
    title: "Untitled",
    content: "",
    tags: []
  });
  const [activeTag, setActiveTag] = useState('')
  
  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        'https://mern-note-app-0vk7.onrender.com/api/notes/create',
        newNote,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/notes');
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <section className='newNote'>
      <h1>Create Note...</h1>
      <div  className="newNote-btn-container">
        <button onClick={handleCreate} >
          Save
          <MdOutlineSaveAs className="icon save-btn"/>
        </button>
      </div>
      <div className='newNote-container'>
        <div className="newNote-section1">
          <input 
            type="txt"
            value={newNote.title}
            onChange={e => {
              setNewNote(prev => ({...prev, title: e.target.value }))
            }}
          />
        </div>
        <div  className="newNote-section2">
          <ReactQuill
            theme="snow"
            value={newNote.content}
            onChange={value => setNewNote(prev => ({ ...prev, content: value }))}
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
        <div className="newNote-section3">
          <TagColorPicker 
            handleAddTag={(tag) => handleAddTag(tag,setNewNote)}
            handleSelectColor={(color) => handleSelectColor(color,setNewNote,activeTag)}
          />
        </div>
        <div className='newNote-section4'> 
          {
            newNote.tags.map((tag,i) => {
              return(
                <div key={i} >
                  <button 
                    id={i} 
                    className="tag" 
                    onClick={() =>{
                      handleTagClick(i, activeTag,setActiveTag)
                    }}
                    style={{backgroundColor:tag.color}}
                  > 
                    {tag.name}
                    <IoClose  
                      className="icon close-btn"
                      onClick={() => handleDeleteTag(i,setNewNote)}
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

export default CreateNote

