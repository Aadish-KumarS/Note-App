import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill'; // Import Quill editor
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

const PreviewNote = () => {
  const { id } = useParams(); // Get note ID from URL
  const [note, setNote] = useState(null); // State to hold the note data
  const quillRef = useRef(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`https://mern-note-app-0vk7.onrender.com/api/notes/get-one/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNote(response.data.data); // Assuming response has data.data for the note
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    fetchNote();
  }, [id]);

  return (
    <div className='preview'>
      {note ? (
        <>
          <h1>{note.title}</h1>

          <div className="preview-content">
            <ReactQuill
              ref={quillRef}
              value={note.content || '<p>nthg</p>'} 
              readOnly
              theme="snow"
              modules={{ toolbar: false }} 
            />
          </div>

          <div>
            {note.tags && note.tags.length > 0 ? (
              note.tags.map((tag, i) => (
                <div key={i} className='preview-tagContainer'>
                  <span 
                    className='tag'
                    style={{backgroundColor: tag.color}}
                    >
                    {tag.name}
                  </span>
                </div>
              ))
            ) : (
              <p>No tags available</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PreviewNote;
