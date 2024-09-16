import axios from 'axios';
import { useEffect, useState } from 'react';
import NoteCard from '../../components/NoteCard/NoteCard';
import { filter } from '../../utils/eventHandlers.js';



const ImportantNotes = ({filterNotes}) => {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    const fetchImportantNotes = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const res = await axios.get('http://localhost:5001/api/notes/get-all',{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        });
        const importantNotes = res.data.data.filter(note => note.isImportant);
        filter(filterNotes,importantNotes,setNotes);
      } catch (error) {
        console.log('Error fetching important notes:', error.message);
      }
    };
    fetchImportantNotes();
  },[filterNotes]);
  


  return (
    <section className='important-notes'>
      {notes ? 
        <NoteCard notes={notes} setNotes={setNotes}/> :
        "nthg"
      }
    </section>
  )
}

export default ImportantNotes