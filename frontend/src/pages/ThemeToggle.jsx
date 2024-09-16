/* eslint-disable no-unused-vars */
import {   useEffect, useState } from 'react';
import './styles/themeToggle.css'
import { BiSolidCoffeeBean } from "react-icons/bi";
import { FaYinYang } from "react-icons/fa6";
import { themeMenu } from '../constants/constants';
import { IoIosSwitch } from "react-icons/io";
import { TbSunset2 } from "react-icons/tb";
import { Link } from 'react-router-dom';


const ThemeToggle = () => {

  const [theme, setTheme] = useState(localStorage.getItem('theme'));


  const iconMap = {
    coffee: BiSolidCoffeeBean,
    bw: FaYinYang,
    sunsetBlush: TbSunset2,
  };

  useEffect(() => {
    document.body.className = theme; 
  }, [theme]);

  const handleThemeChange = (name) =>{
    setTheme(name);
    localStorage.setItem('theme', name);
  }

  return (
    <section className='themeToggle'>
      <Link to={'/'}>
        Back
      </Link>
      {themeMenu.map((theme, i) => {
        const IconComponent = iconMap[theme.icons];
        return (
          <div key={i} className='themeToggle-container'>
            <div className='themeToggle-section1'> 
              <div className='theme-num'>
                <h1>{i+1}</h1>
              </div>
              <div className='theme-title'>
                <h1>{theme.name}</h1>
                <IconComponent className='icon theme-icons' />
              </div>
            </div>
            <div className='theme-info'>
              <div>
                <button className='switch-btn' onClick={() => handleThemeChange(theme.icons)}>
                    <IoIosSwitch className='icon swtich'/> 
                </button>
                <strong>Click here to switch</strong>
              </div>
              <div>
                {theme.info}
              </div>
              <div className='theme-img'>
                <img src={theme.img} />
              </div>
            </div>
          </div>

        )
      })}
    </section>
  )
}

export default ThemeToggle

