import { useEffect, useState } from "react"
import axios from 'axios';
import '../styles/notes.css'
import NoteCard from "../../components/NoteCard/NoteCard";



const NotesList = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/notes/get-all');
        setNotes(res.data.data);
      } catch (error) {
        console.error('Error fetching notes:', error.message);
      }
    };

    fetchNotes();
  }, []);
  
  const handleDeleteNote = async (id) => {
    try {
      const delteNote =  await axios.get(`http://localhost:5001/api/notes/get-one/${id}`);
      console.log(id)
      const data = {
        title: delteNote.data.data.title,
        content: delteNote.data.data.content,
        isImportant :  delteNote.data.data.isImportant,
        _id: delteNote.data.data._id,
        tags: [...delteNote.data.data.tags]
      } ;
      await axios.post('http://localhost:5001/api/deleted-notes/post',data)
      await axios.delete(`http://localhost:5001/api/notes/delete/${id}`)
      setNotes((prev) => prev.filter((n) => n._id !== id));
      console.log(data)
    } catch (error) {
      console.error('Error handling delete notes notes:', error.message);
    }
  }



  return (
    <div className="noteList">
      <div className="noteList_container">
        <NoteCard 
          notes={notes} 
          setNotes={setNotes} 
          handleDeleteNote={handleDeleteNote}
        />
      </div>
    </div>
  )
}

export default NotesList
