import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

const DeleteNote = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    axios.delete(`http://localhost:5001/api/notes/delete/${id}`,)
      .then(() => navigate('/notes') )
  }

  const handleNo = () => {
    navigate('/notes')
  }

  return (
    <section className='deleteNote'>
      <h1>Are you sure you want to delete your Masterpeice 😲???</h1>
      <div>
        <button onClick={handleDelete} >
          <TiTick className='icon yes-btn' />
        </button> 
        <button onClick={handleNo}>
          <RxCross2 className='icon no-btn'/>
        </button>
      </div>
    </section>
  )
}

export default DeleteNote