import { useEffect, useState } from "react"
import axios from 'axios';
import '../styles/notes.css'
import NoteCard from "../../components/NoteCard/NoteCard";



const NotesList = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5001/api/notes/get-all')
      .then(res => {
        setNotes(res.data.data)
      })
  }, []);
  

  return (
    <div className="noteList">
      <div className="noteList_container">
        <NoteCard notes={notes} setNotes={setNotes} />
      </div>
    </div>
  )
}

export default NotesList
