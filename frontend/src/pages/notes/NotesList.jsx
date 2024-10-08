import { useEffect, useState } from "react"
import axios from 'axios';
import '../styles/notes.css'
import NoteCard from "../../components/NoteCard/NoteCard";
import { filterAndSortNotes } from "../../utils/eventHandlers.js";
import { Link } from "react-router-dom";



const NotesList = ({filterNotes,selectedTagColor}) => {
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem('authToken')

  
  useEffect(() => { 
    const fetchNotes = async () => {
      
      if(token){
        try {
          const token = localStorage.getItem('authToken');
          const res = await axios.get('https://mern-note-app-0vk7.onrender.com/api/notes/get-all',{
            headers:{
              Authorization: `Bearer ${token}`,
            }
          });
          const data = res.data.data
          filterAndSortNotes(filterNotes, data, setNotes, selectedTagColor);

        } catch (error) {
          console.error('Error fetching notes:', error.message);
        }
      }
    };
    fetchNotes();
  }, [filterNotes,selectedTagColor]);
  


  return (
    <div className="noteList">
      {
        token 
          ? (
            <>
              {
                selectedTagColor 
                  && <h1 style={{backgroundColor: selectedTagColor}} className="colorName-filter" >
                        {selectedTagColor}
                      </h1>
              }
              <div className="noteList_container">
                <NoteCard 
                  notes={notes} 
                  setNotes={setNotes} 
                />
              </div>
            </>
          )
          : (
            <div className="empty-list">
              <h1>Access your account to begin note creation.</h1>
              <Link to={'/profile'} className="getStarted-btn">
                Get Started
              </Link>
            </div>
          )
      }
    </div>
  )
}

export default NotesList
