/* eslint-disable react/prop-types */
import { Route, Routes } from 'react-router-dom'
import Notes from './notes/Notes.page'
import SlideMenu from '../components/SlideMenu/SlideMenu'
import './styles/home.page.css'
import Construction from '../components/Construction/Construction'
import ThemeToggle from './ThemeToggle'

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
          <Route path="/notes/*" element={<Notes/>} />
          <Route path='' element={<h1>hello</h1>} />
          <Route path="/construction" element={<Construction />}/>
          <Route path="/theme" element={<ThemeToggle />}/>
        </Routes>
      </div>
      </div>
    </section>
  )
}

export default Home