import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.pages.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('authToken');
      await axios.post('https://mern-note-app-0vk7.onrender.com/api/auth/logout');
  
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="user-profile">
      <div className='profile-container'>
        <button className='back-btn' onClick={() => navigate('/')}>
          Back
        </button>
        {
          !isLoggedIn 
          ?(    
            <div className='user-section'>
              <div className='register-container'>
                <div className='title-container'>
                  <h1>New to Noter? Make a account now.</h1>
                  <h1>Easy and Fast.</h1>
                </div>
                <Link className='user-btn' to={'/profile/register'}>
                  Register
                </Link>
              </div>
              <div  className='login-container'>
                <div className='title-container'>
                  <h1>Already a User? Login in.</h1>
                </div>
                <Link className='user-btn' to={'/profile/login'}>
                  Login
                </Link>
              </div>
            </div>
            )
          : (
            <div className='user-section'>
              <div className='logout-container'>
                <div className='title-container'>
                  <h1>Welcome Back!</h1>
                </div>
                <button 
                  className='user-btn'
                  onClick={() => {
                    handleLogout();
                    navigate('/');
                  }}>
                    Logout
                </button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default UserProfile;
