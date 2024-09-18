/* eslint-disable react/prop-types */
import { Route, Routes } from 'react-router-dom'
import Notes from './notes/Notes.page'
import SlideMenu from '../components/SlideMenu/SlideMenu'
import './styles/home.page.css'
import Construction from '../components/Construction/Construction'
import ThemeToggle from './ThemeToggle'
import Hero from '../components/Hero/Hero'
import UserProfile from './auth page/UserProfile'
import Register from './auth page/Register'
import Login from './auth page/Login'
import Confirmation from './auth page/Confirmation'
import { useState } from 'react'

const Home = (props) => {
  
  const {isSlideMenuActive } = props
  const savedTheme = localStorage.getItem('theme');
  const theme = savedTheme || 'coffee';
  const [selectedTagColor, setSelectedTagColor] = useState('');
  document.body.className = theme;
  

  return (
    <section className='home'>
      <div className='home_conatiner'>
      {isSlideMenuActive && 
        <div className='home_conatiner-menu'>
          <SlideMenu 
            setSelectedTagColor={setSelectedTagColor} 
            selectedTagColor={selectedTagColor}
          />
        </div>
      }
      <div className='home_conatiner-route'>
        <Routes>
          <Route path="/notes/*" element={ <Notes selectedTagColor={selectedTagColor}/>} />
          <Route path='' element={<Hero />} />
          <Route path="/construction" element={<Construction />}/>
          <Route path="/theme" element={<ThemeToggle />}/>
          <Route path="/profile/*" element={<UserProfile />} />
          <Route path="/profile/register" element={<Register />} />
          <Route path="/profile/login" element={<Login />} />
          <Route path="/profile/confirmation" element={<Confirmation />} />
        </Routes>
      </div>

      </div>
    </section>
  )
}

export default Home