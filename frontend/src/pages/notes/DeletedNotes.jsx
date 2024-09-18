import axios from 'axios'
import { useEffect, useState } from 'react'
import NoteCard from '../../components/NoteCard/NoteCard';
import { MdOutlineDeleteForever, MdOutlineRestorePage } from 'react-icons/md';
import PopupCard from '../../components/PopupCard/PopupCard';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { filterAndSortNotes, handleCancel, handleConfirm } from '../../utils/eventHandlers.js';

const DeletedNotes = (props) => {

  const {
    showAlertPopup,
    popupAction,
    setShowAlertPopup,
    setPopupAction,
    filterNotes,
    selectedTagColor
  } = props
  const [deletedNotes, setDeletedNotes] = useState([]);
  const token = localStorage.getItem('authToken');


  useEffect(() => {
    const fetchDeletedNotes = async () => {
      try {
        const deletedNotes = await axios.get('https://mern-note-app-0vk7.onrender.com/api/deleted-notes/all',{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        });
        const data = deletedNotes.data.data
        filterAndSortNotes(filterNotes,data,setDeletedNotes,selectedTagColor);
      } catch (error) {
        console.log('Error fetching deleted notes:', error.message);
      }
    }
    fetchDeletedNotes()
  },[filterNotes,selectedTagColor]);

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
          <div >
            <PopupCard 
              title={popupAction}
              onConfirm={() => handleConfirm(
                deletedNotes, 
                setDeletedNotes,
                popupAction,
                setShowAlertPopup,
                setPopupAction,
                token
              )}
              onCancel={() => handleCancel(setShowAlertPopup)}
              deletedNotes={deletedNotes}
              setDeletedNotes={setDeletedNotes}
              />
          </div>
        )
      )}
      <div className='deletedNotes-card-container'>
        {
          deletedNotes.length === 0  
            ? <div className='no-notes'> 
                <h1>No deleted notes. </h1>
              </div>
            : 
              <>
                {
                  selectedTagColor 
                    && <h1 style={{backgroundColor: selectedTagColor}} className="colorName-filter" >
                          {selectedTagColor}
                        </h1>
                }
                <NoteCard notes={deletedNotes} setNotes={setDeletedNotes} isDeleted={true} />
              </>
        }
      </div>


    </section>
  )
}

export default DeletedNotes