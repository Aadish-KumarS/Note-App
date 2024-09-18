import axios from 'axios';
import { useEffect, useState } from 'react';
import NoteCard from '../../components/NoteCard/NoteCard';
import { filterAndSortNotes } from '../../utils/eventHandlers.js';



const ImportantNotes = ({filterNotes,selectedTagColor}) => {

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
        filterAndSortNotes(filterNotes,importantNotes,setNotes,selectedTagColor);
      } catch (error) {
        console.log('Error fetching important notes:', error.message);
      }
    };
    fetchImportantNotes();
  },[filterNotes,selectedTagColor]);
  


  return (
    <section className='important-notes'>
      {notes.length > 0 ? 
        <>
          {
            selectedTagColor 
              && <h1 style={{backgroundColor: selectedTagColor}} className="colorName-filter" >
                    {selectedTagColor}
                  </h1>
          }
          <NoteCard notes={notes} setNotes={setNotes}/> 
        </>
        :  <div className='no-notes'> 
            <h1>No important notes.</h1>
          </div>
      }
    </section>
  )
}

export default ImportantNotes