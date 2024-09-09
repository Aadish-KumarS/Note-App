import { Link } from "react-router-dom"
import './slideMenu.css'
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { PiPencilSimpleBold } from "react-icons/pi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { rotateArrow, slideAnimation } from "../../utils/animation";

const SlideMenu = () => {

  const [isArrowActive, setIsArrowActive] = useState({
    notes: true,
    todo: true,
  })

  const handleArrow = () => {
    setIsArrowActive(prev => ({...prev, notes: !prev.notes}))
    {
      if(isArrowActive.notes) {
        slideAnimation('.notes-list', '-30px',) 
        rotateArrow('.arrow','90deg')
      } else {
        slideAnimation('.notes-list','-300px',)
        rotateArrow('.arrow','0deg')
      }
    }
  }

  return (
    <section className="menu">
      <div></div>
      <div></div>
      <div className="menu-section3">
        <div className="menu-notes">
          <Link 
            className="section3-item" 
            to={'/notes'}
            onClick={() => handleArrow('note')}
          > 
            Notes 
            <IoIosArrowForward
              className={`icon arrow `}
            />
          </Link>
          <div className="notes-list">
            <div >
              <Link className="notes-list-item" to={'/notes/create'}>
                Create new Note <AiOutlinePlusCircle className="icon" />
              </Link>
            </div>
            <div className="notes-list-item">
              Edit a Note <PiPencilSimpleBold className="icon" />
            </div>
            <div className="notes-list-item">
              Delete Notes <MdOutlineDeleteForever className="icon" />
            </div>
          </div>
        </div>
        <Link 
          className="section3-item" 
          to={'/construction'}
          onClick={() => handleArrow('todo')}
        > 
          Todo <IoIosArrowForward className="icon arrow" />
        </Link>
      </div>
      <div></div>
    </section>
  )
}

export default SlideMenu