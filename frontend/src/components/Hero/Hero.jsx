import './hero.css'
import { GiNotebook } from "react-icons/gi";
import gsap from 'gsap'
import { useEffect } from 'react';
import {Link} from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

  useEffect(() => {
    gsap.to('.welcome-title',{
      opacity: 1,
      delay: .015,
      y: 0,
      ease: 'power1.inOut'
    });

    gsap.to('.intro',{
      x: 0,
      delay: .015,
      ease: 'power1.inOut',
      opacity: 1,
    })
  },[])

  return (
    <section className="welcome-content">
      <h1>Welcome to Your New Favorite Notes App! 🎉</h1>
      <p>
        <strong>Hello and Welcome!</strong> We’re excited to have you here! Our app is designed to
        help you capture your thoughts, organize your ideas, and keep your life on track—all in one
        place.
      </p>
      <p>
        Whether you’re jotting down quick notes, managing important tasks, or planning your next big
        project, our app is built to make your life easier and more organized. Dive in and start
        creating your own personalized digital workspace today!
      </p>
      <h2>Why You'll Love It Here:</h2>
      <ul>
        <li>
          <strong>Easy to Use:</strong> Our intuitive interface makes note-taking a breeze.
        </li>
        <li>
          <strong>Stay Organized:</strong> Tag, categorize, and prioritize your notes effortlessly.
        </li>
        <li>
          <strong>Access Anywhere:</strong> Available on all your devices, anytime you need it.
        </li>
        <li>
          <strong>Safe and Secure:</strong> Your notes are encrypted and protected, always.
        </li>
      </ul>
      <p>
        <strong>Ready to Get Started?</strong> Click below to explore the world of seamless
        note-taking. We can’t wait to see what you’ll create!
      </p>
    </section>
  )
}

export default Hero