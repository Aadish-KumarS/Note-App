import axios from "axios";



export const filter = (filterNotes,data,setNotes) => {
  if(filterNotes){
    const filteredNotes = filterNotes
      ? data.filter(note => 
        note.title.toLowerCase().includes(filterNotes.toLowerCase()) 
        || note.content.toLowerCase().includes(filterNotes.toLowerCase()))
      : data;
    setNotes(filteredNotes);
  }else {
    setNotes(data);
  }
}


export const deleteNote = async (id,setNotes,token) => {
  try {
    const delteNote =  await axios.get(`http://localhost:5001/api/notes/get-one/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });
    const note = delteNote.data.data
    const data = {
      title: note.title,
      content: note.content,
      isImportant :  note.isImportant,
      _id: note._id,
      tags: [...note.tags],
      user: note.user,   
    } ;
    await axios.post('http://localhost:5001/api/deleted-notes/post',data,{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    await axios.delete(`http://localhost:5001/api/notes/delete/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    setNotes((prev) => prev.filter((n) => n._id !== id));
  } catch (error) {
    console.error('Error handling delete notes notes:', error.message);
  }
};


export const handleDeleteTag = (id,setNote) => {
  setNote((prev) => ({
    ...prev,
    tags: prev.tags.filter((tag, index) => {
      return tag._id !== id && index !== id;
    }),
  }));
}


export const handleAddTag = (tag,setNote) => {
  const newTag = {name: tag, color: 'gray'}
  if(newTag){
    setNote(prev => {
      return {...prev,tags: [
        ...prev.tags, newTag
      ]}
    })
  }
}


export const handleSelectColor = (color, setNote, activeTag) => {
  setNote((prev) => ({
    ...prev,
    tags: prev.tags.map((tag, index) => {
      const isActive = activeTag === tag._id || activeTag === index;
      return isActive ? { ...tag, color: color } : tag;
    }),
  }));
};


export const handleTagClick = (id,activeTag,setActiveTag) => {
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


export const handleSetImportant = async (note, setNotes,token) => {
  try {
    const updatedNote = { ...note, isImportant: !note.isImportant };
    await axios.put(`http://localhost:5001/api/notes/edit/${note._id}`, {
      ...note,
      isImportant: updatedNote.isImportant,
    },{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });

    setNotes((prevNotes) => {
      if (Array.isArray(prevNotes)) {
        return prevNotes.map((prevNote) =>
          prevNote._id === note._id
            ? { ...prevNote, isImportant: updatedNote.isImportant }
            : prevNote
        );
      } else if (prevNotes._id === note._id) {
        return { ...prevNotes, isImportant: updatedNote.isImportant };
      }
      return prevNotes;
    });
  } catch (error) {
    console.error("Error updating note importance:", error.message);
  }
};


export  const handleConfirm = async (deletedNotes, setDeletedNotes,popupAction,setShowAlertPopup,setPopupAction,token) => {
  try {
    if (popupAction === 'delete') {
      await axios.delete('http://localhost:5001/api/deleted-notes/delete-all',{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      setDeletedNotes([]);
    } else if (popupAction === 'restore') {
      try {
        await Promise.all(
          deletedNotes.map((note) =>
            axios.post('http://localhost:5001/api/notes/create', note,{ 
              headers:{
              Authorization: `Bearer ${token}`,
            }})
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


export  const handleCancel = (setShowAlertPopup) => {
  setShowAlertPopup(false);
  document.body.classList.remove('no-scroll')
};


export  const handleGoBack = (navigate) => {
  navigate(-1); 
};

export const handleRestoreOne = async (id, setNotes,token) => {
  try {
    const deletedNoteResponse = await axios.get(`http://localhost:5001/api/deleted-notes/get-one/${id}`);
    const note = deletedNoteResponse.data.data;

    await axios.delete(`http://localhost:5001/api/deleted-notes/delete-one/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });
    await axios.post('http://localhost:5001/api/notes/create', note,{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });

    setNotes(prev => prev.filter(note => note._id !== id));
  } catch (error) {
    console.error('Error restoring the note:', error.message);
  }
};

