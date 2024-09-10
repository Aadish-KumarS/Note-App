import './popupCard.css'; // Include CSS for styling the popup
import { TiTick } from "react-icons/ti";
import { FaXmark } from "react-icons/fa6";
import { useEffect } from 'react';
import { TbTrash } from "react-icons/tb";
import { MdOutlineRestore } from 'react-icons/md';

const PopupCard = (props) => {

  const { title, onConfirm, onCancel,setDeletedNotes,deletedNotes } = props

  useEffect(() => {
    document.body.classList.add('no-scroll')
  },[])

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <div className='popup-content'>
          <h1>You sure you want to {title} all??</h1>
          <h3>Confirm lets you {title} all the Notes. 
            Cancle lets you undo/go back.</h3>
        </div>
        <div className="popup-actions">
          <button 
            className="confirm-btn" 
            onClick={() => onConfirm(deletedNotes,setDeletedNotes)}>
            Confirm
            <TiTick className='icon tick'/>
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
            <FaXmark className='icon wrong'/>
          </button>
        </div>
        <div className='card-background'> 
          {
            title === 'delete' 
              ? <TbTrash className='bg-icon' />
              : <MdOutlineRestore  className='bg-icon'/>
          }
          
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
