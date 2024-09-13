import { FiPlusCircle } from 'react-icons/fi'
import { tagsColor } from '../../constants/constants'
import './tagColorPicker.css'
import { useState } from 'react'


const TagColorPicker = (props) => {

  const {handleAddTag,handleSelectColor,editNote} = props;

  const [newTag, setNewTag] = useState('');

  return (
    <div>
      <div className="editNote-section3">
          <button onClick={() => handleAddTag(newTag)}>
            Add Tag
            <FiPlusCircle className="icon add-btn" />
          </button>
          <div className="editNote-addTag">
            <input 
              type="text"
              placeholder="Add Tag"
              max={15}
              onChange={e => setNewTag(e.target.value)}
            />
            <div className="tagColor-container" >
              {tagsColor.map((color,i) =>{
                return(
                  <div 
                    key={i} 
                    className="tag-color" 
                    style={{backgroundColor: color.color}}
                    onClick={() => handleSelectColor(color.color,i)}
                  >
                  </div>
                )
              })}
            </div>
          </div>
        </div>
    </div>
  )
}

export default TagColorPicker