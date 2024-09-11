import axios from 'axios';
import { useEffect, useState } from 'react';
import NoteCard from '../../components/NoteCard/NoteCard';
import { filter } from '../../utils/functions';



const ImportantNotes = ({filterNotes,handleDeleteNote}) => {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    const fetchImportantNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/notes/get-all');
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
        <NoteCard notes={notes} setNotes={setNotes} handleDeleteNote={handleDeleteNote}/> :
        "nthg"
      }
    </section>
  )
}

export default ImportantNotes