import { Link } from "react-router-dom"
import './slideMenu.css'
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { PiPencilSimpleBold } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { FaRegNoteSticky } from "react-icons/fa6";


const SlideMenu = () => {


  return (
    <section className="menu">
      <div></div>
      <div></div>
      <hr />
      <div className="menu-section3">
        <div className="menu-notes">
          <div className="section3-item">
            Notes 
            <IoIosArrowForward
              className={`icon arrow `}
            />
          </div>
          <div className="notes-list">
            <div>
              <Link 
                className=" notes-list-item" 
                to={'/notes'}
              > 
                All Notes <FaRegNoteSticky className="icon" />
              </Link>
            </div>
            <div >
              <Link className="notes-list-item" to={'/notes/create'}>
                Create new Note <AiOutlinePlusCircle className="icon" />
              </Link>
            </div>
            {/* <div>
              <Link  className="notes-list-item" to={'/construction'}>
                Edit a Note 
                <PiPencilSimpleBold   className="icon" />
              </Link>
            </div> */}
            <div>
              <Link  to={'/notes/deleted-notes'} className="notes-list-item">
                Delete Notes 
                <MdAutoDelete className="icon" />
              </Link>
            </div>
            <div>
              <Link  className="notes-list-item" to={'/notes/important-notes'}>
                Important <FaRegStar  className="icon" />
              </Link>
            </div>
            
          </div>
        </div>
        <Link 
          className="section3-item" 
          to={'/construction'}
        > 
          Todo <IoIosArrowForward className="icon arrow" />
        </Link>
      </div>
      <hr />
      <div>
        
      </div>
    </section>
  )
}

export default SlideMenu