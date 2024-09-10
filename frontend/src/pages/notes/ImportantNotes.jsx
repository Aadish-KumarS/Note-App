import axios from 'axios';
import { useEffect, useState } from 'react';
import NoteCard from '../../components/NoteCard/NoteCard';



const ImportantNotes = () => {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetchImportantNotes();
  },[]);
  
  const fetchImportantNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/notes/get-all');
      const importantNotes = res.data.data.filter(note => note.isImportant);
      setNotes(importantNotes);
    } catch (error) {
      console.log('Error fetching important notes:', error.message);
    }
  };

  console.log("ho");
  

  return (
    <section className='important-notes'>
      {notes ? 
        <NoteCard notes={notes} setNotes={setNotes} /> :
        "nthg"
      }
    </section>
  )
}

export default ImportantNotes