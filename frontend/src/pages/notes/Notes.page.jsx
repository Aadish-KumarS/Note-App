import { Route, Routes } from "react-router-dom"
import CreateNote from "./CreateNote"
import NotesList from "./NotesList"
import '../styles/notes.css'
import EditNote from "./EditNote"
import DeleteNote from "./DeleteNote"
import NoteDetail from './NoteDetail'

const Notes = () => {

  const handleAddTag = (tag,setNote,note) => {
    const newTag = {name: tag, color: 'gray'}
    console.log(note.tags)
    if(newTag){
      setNote(prev => {
        return {...prev,tags: [
          ...prev.tags, newTag
        ]}
      })
    }
  }
  const handleSelectColor = (color, setNote, activeTag) => {
    setNote((prev) => ({
      ...prev,
      tags: prev.tags.map((tag, index) => {
        const isActive = activeTag === tag._id || activeTag === index;
        return isActive ? { ...tag, color: color } : tag;
      }),
    }));
  };

  const handleTagClick = (id,activeTag,setActiveTag) => {
    console.log('Active Tag', activeTag)
    const previousActive = document.getElementById(activeTag);
    if (activeTag === id) {
      previousActive && previousActive.classList.remove('active-tag');
      setActiveTag(null);
    } else {
      previousActive && previousActive.classList.remove('active-tag');
      setActiveTag(id);
      const newActive = document.getElementById(id);
      newActive && newActive.classList.add('active-tag');
    }
  };

  const handleDeleteTag = (id,setNote) => {
    setNote((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag, index) => {
        return tag._id !== id && index !== id;
      }),
    }));
  }


  return (
    
    <Routes>
      <Route path="/" element={<NotesList/>}/>
      <Route path="create" element={
        <CreateNote 
          handleAddTag={handleAddTag} 
          handleSelectColor={handleSelectColor} 
          handleTagClick={handleTagClick}
          handleDeleteTag={handleDeleteTag}
        />
      }/>
      <Route path="delete/:id" element={<DeleteNote/>}/>
      <Route path="edit/:id" element={
        <EditNote 
          handleAddTag={handleAddTag} 
          handleSelectColor={handleSelectColor} 
          handleTagClick={handleTagClick}
          handleDeleteTag={handleDeleteTag}
        />
      }/>
      <Route path=":id" element={<NoteDetail/>}/>
    </Routes>
  )
}

export default Notes