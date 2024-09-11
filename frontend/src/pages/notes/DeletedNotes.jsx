import axios from 'axios'
import { useEffect, useState } from 'react'
import NoteCard from '../../components/NoteCard/NoteCard';
import { MdOutlineDeleteForever, MdOutlineRestorePage } from 'react-icons/md';
import PopupCard from '../../components/PopupCard/PopupCard';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { filter } from '../../utils/functions';


const DeletedNotes = (props) => {

  const {
    showAlertPopup,
    popupAction,
    setShowAlertPopup,
    setPopupAction,
    onConfirm,
    onCancel,
    filterNotes
  } = props
  const [deletedNotes, setDeletedNotes] = useState([]);

  useEffect(() => {
    const fetchDeletedNotes = async () => {
      try {
        const deletedNotes = await axios.get('http://localhost:5001/api/deleted-notes/all');
        const data = deletedNotes.data.data
        filter(filterNotes,data,setDeletedNotes);
      } catch (error) {
        console.log('Error fetching deleted notes:', error.message);
      }
    }
    fetchDeletedNotes()
  },[filterNotes]);

  const handleDeleteAllNote = () => {
    setShowAlertPopup(true);
    setPopupAction('delete')

  }


  const handleRestoreAllNote =  () => {
    setShowAlertPopup(true);
    setPopupAction('restore')
  }


  return (
    <section className='deletedNotes'>
      <div className='deletedNotes-btnContainer'>
        <div className='deletedNotes-btn' onClick={handleDeleteAllNote}>
          Delete All
          <MdOutlineDeleteForever className='icon delete-all-btn'  />
        </div>
        <div className='deletedNotes-btn' onClick={handleRestoreAllNote}>
          Restore All
          <MdOutlineRestorePage className='icon restore-all-btn' />
        </div>
      </div>
      {showAlertPopup && (
        deletedNotes.length === 0 ? (
          <div className='empty-alert'>
            No Element to {popupAction}
            <IoAlertCircleOutline className='icon'/>
          </div>
        ) : (
          <div>
            <PopupCard 
              title={popupAction}
              onConfirm={onConfirm}
              onCancel={onCancel}
              deletedNotes={deletedNotes}
              setDeletedNotes={setDeletedNotes}
              />
          </div>
        )
      )}
      <div>
        {
          deletedNotes.length === 0  
            ? <div className='empty-deletedNotes'> No deleted notes. </div>
            : <NoteCard notes={deletedNotes} setNotes={setDeletedNotes} isDeleted={true} />
        }
      </div>


    </section>
  )
}

export default DeletedNotes