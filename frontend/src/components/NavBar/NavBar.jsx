/* eslint-disable react/prop-types */
import { LuMenuSquare } from "react-icons/lu";
import {Link, useLocation} from 'react-router-dom'
import './navBar.css'
import { IoColorPalette } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

const NavBar = ({setIsSlideMenuActive,}) => {

  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('authToken');
  const isActive = (path) => {
    if(location.pathname === path){
      return true
    }
  }

  return (
    <section className="navbar">
      <nav className="nav">
        <div className="nav_section1">
          <button 
            onClick={() => {setIsSlideMenuActive(prev => !prev)}}
          >
            <LuMenuSquare className="icon menu-btn" />
          </button>
        </div>
        <ul className="nav_section2">
          <li className={isActive('/') ? 'active' : ''}>
            <Link to={'/'}>Home</Link>
          </li>
          <li className={isActive('/notes') ? 'active' : ''}>
            <Link to={'/notes'}>Notes</Link>
          </li>
          <li className={isActive('/todo') ? 'active' : ''}>
            <Link to={'/construction'}>Todo</Link>
          </li>
        </ul>
        <div className="nav_section3">
            <Link  to={'/theme'}>
              <IoColorPalette className='icon theme-btn' />
            </Link>
            <Link to="/profile" className="icon-btn">
              <MdOutlineAccountCircle className="icon acc-btn" />
            </Link>
        </div>
      </nav>
    </section>
  )
}

export default NavBar