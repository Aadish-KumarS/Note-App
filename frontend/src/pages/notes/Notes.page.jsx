import { Route, Routes } from "react-router-dom"
import CreateNote from "./CreateNote"
import NotesList from "./NotesList"
import '../styles/notes.css'
import EditNote from "./EditNote"
import DeleteNote from "./DeleteNote"
import NoteDetail from './NoteDetail'
import ImportantNotes from "./ImportantNotes"
import DeletedNotes from "./DeletedNotes"
import { useState } from "react"
import axios from 'axios'

const Notes = () => {

  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [popupAction, setPopupAction] = useState('');


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

  const handleConfirm = async (deletedNotes, setDeletedNotes) => {
    try {
      if (popupAction === 'delete') {
        await axios.delete('http://localhost:5001/api/deleted-notes/delete-all');
        setDeletedNotes([]);
      } else if (popupAction === 'restore') {
        try {
          await Promise.all(
            deletedNotes.map((note) =>
              axios.post('http://localhost:5001/api/notes/create', note)
            )
          );
          await axios.delete('http://localhost:5001/api/deleted-notes/delete-all');
          setDeletedNotes([]);
        } catch (error) {
          console.error('Error restoring all deleted notes:', error.message);
        }
      }
    } catch (error) {
      console.error(
        `Error handling ${popupAction === 'delete' ? 'deleting' : 'restoring'} all notes:`,
        error.message
      );
    } finally {
      setShowAlertPopup(false);
      setPopupAction('');
      document.body.classList.remove('no-scroll')

    }
  };
  

  const handleCancel = () => {
    setShowAlertPopup(false);
    document.body.classList.remove('no-scroll')
  };

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
      <Route path="important-notes" element={<ImportantNotes/>}/>
      <Route path="deleted-notes" element={
        <DeletedNotes
          showAlertPopup={showAlertPopup}  
          popupAction={popupAction}
          setPopupAction={setPopupAction}
          setShowAlertPopup={setShowAlertPopup}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      }/>
    </Routes>
  )
}

export default Notes