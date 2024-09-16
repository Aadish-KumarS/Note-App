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

const Home = (props) => {
  
  const {isSlideMenuActive } = props
  const savedTheme = localStorage.getItem('theme');
  const theme = savedTheme || 'coffee';



  document.body.className = theme;
  


  return (
    <section className='home'>
      <div className='home_conatiner'>
      {isSlideMenuActive && 
        <div className='home_conatiner-menu'>
          <SlideMenu />
        </div>
      }
      <div className='home_conatiner-route'>
        <Routes>
          <Route path="/notes/*" element={ <Notes/>} />
          <Route path='' element={<Hero />} />
          <Route path="/construction" element={<Construction />}/>
          <Route path="/theme" element={<ThemeToggle />}/>
          <Route path="/profile/*" element={<UserProfile />} />
          <Route path="/profile/register" element={<Register />} />
          <Route path="/profile/login" element={<Login />} />
        </Routes>
      </div>

      </div>
    </section>
  )
}

export default Home