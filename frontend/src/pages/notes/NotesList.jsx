import { useEffect, useState } from "react"
import axios from 'axios';
import '../styles/notes.css'
import NoteCard from "../../components/NoteCard/NoteCard";
import { filter } from "../../utils/eventHandlers.js";



const NotesList = ({filterNotes}) => {
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem('authToken')

  useEffect(() => { 
    const fetchNotes = async () => {
      if(token){
        try {
          const token = localStorage.getItem('authToken');
          const res = await axios.get('http://localhost:5001/api/notes/get-all',{
            headers:{
              Authorization: `Bearer ${token}`,
            }
          });
          const data = res.data.data
          filter(filterNotes,data,setNotes)
        } catch (error) {
          console.error('Error fetching notes:', error.message);
        }
      }
    };
    fetchNotes();
  }, [filterNotes]);
  



  return (
    <div className="noteList">
      <div className="noteList_container">
        <NoteCard 
          notes={notes} 
          setNotes={setNotes} 
        />
      </div>
    </div>
  )
}

export default NotesList
