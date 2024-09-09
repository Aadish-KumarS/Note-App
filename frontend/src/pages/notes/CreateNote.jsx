import axios from 'axios'
import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import '../styles/notes.css'
import { MdOutlineSaveAs } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import TagColorPicker from '../../components/TagColorPicker/TagColorPicker';
import { IoClose } from 'react-icons/io5';


const CreateNote = (props) => {

  const {handleAddTag,handleSelectColor,handleTagClick,handleDeleteTag} = props
  const navigate  = useNavigate();
  const [newNote, setNewNote] = useState({
    title: "Untitled",
    content: "What's on your mind?",
    tags: []
  });
  const [activeTag, setActiveTag] = useState('')
  
  const handleCreate = () => {
    axios.post('http://localhost:5001/api/notes/create',newNote)
      .then(() => {
        navigate('/notes')
      })
      .catch(err => console.log(err))
  }


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
        <TextareaAutosize 
          value={newNote.content}
          onChange={e => {
            setNewNote(prev => ({...prev, content: e.target.value }))
          }}
        />
        </div>
        <div className="newNote-section3">
          <TagColorPicker 
            handleAddTag={(tag) => handleAddTag(tag,setNewNote,newNote)}
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
                    onClick={() => handleTagClick(i, activeTag,setActiveTag)}
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

