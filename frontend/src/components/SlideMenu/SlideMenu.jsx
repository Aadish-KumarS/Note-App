import { Link } from "react-router-dom"
import './slideMenu.css'
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaRegStar } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { FaRegNoteSticky } from "react-icons/fa6";
import { PiTagBold } from "react-icons/pi";
import { tagsColor } from "../../constants/constants";

const SlideMenu = ({ setSelectedTagColor,selectedTagColor }) => {


  return (
    <section className="menu">
      <div></div>
      <div></div>
      <div className="menu-section">
        <div className="menu-notes">
          <div className="section-item">
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

        <div className="menu-notes">
          <div className="section-item">
            Tag Color 
            <PiTagBold
              className={`icon  `}
            />
          </div>
          <div className="notes-list">
            {tagsColor.map((color,i) => {
              return(
                <div 
                  className="notes-list-item" 
                  style={{background: color.color}} 
                  key={i}
                  onClick={() => {
                    if (selectedTagColor === color.color) {
                      setSelectedTagColor('');
                    } else {
                      setSelectedTagColor(color.color);
                    }
                  }
                  }
                  > 
                  {color.name}
                </div>
              )
            })}
          </div>
        </div>

      </div>

    </section>
  )
}

export default SlideMenu