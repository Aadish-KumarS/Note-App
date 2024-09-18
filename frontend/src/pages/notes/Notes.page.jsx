import { Route, Routes } from "react-router-dom"
import CreateNote from "./CreateNote"
import NotesList from "./NotesList"
import '../styles/notes.css'
import EditNote from "./EditNote"
import ImportantNotes from "./ImportantNotes"
import DeletedNotes from "./DeletedNotes"
import { useState } from "react"
import { FiSearch } from "react-icons/fi";
import PreviewNote from "./PreviewNote"


const Notes = ({selectedTagColor}) => {

  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [popupAction, setPopupAction] = useState('');
  const [filterNotes, setFilterNotes] = useState('');


  const handleSearchEnter = (e) => {
    if(e.key === 'Enter'){
      e.target.blur(); 
      setFilterNotes(e.target.value)
      e.target.value = ''
    }
  }
  
  return (
    
    <div>
      <div className='search-note'>
          <input 
            type='text'
            onChange={(e) => setFilterNotes(e.target.value)}
            max={50}
            min={4}
            onKeyDown={(e) => handleSearchEnter(e)}
          />
          <FiSearch className='icon search-btn' />
        </div>
      <Routes>
        <Route path="/" element={
          <NotesList
            filterNotes={filterNotes} 
            selectedTagColor={selectedTagColor}
          />
        }/>
        <Route path="create" element={<CreateNote /> }/>
        <Route path="edit/:id" element={<EditNote />}/>
        <Route path="important-notes" element={
          <ImportantNotes selectedTagColor={selectedTagColor} filterNotes={filterNotes}/>
        }/>
        <Route path="deleted-notes" element={
          <DeletedNotes
            showAlertPopup={showAlertPopup}  
            popupAction={popupAction}
            setPopupAction={setPopupAction}
            setShowAlertPopup={setShowAlertPopup}
            filterNotes={filterNotes}
            selectedTagColor= {selectedTagColor}
          />
        }/>
        <Route path="previwe/:id" element={<PreviewNote/>}/>
      </Routes>
    </div>
  )
}

export default Notes