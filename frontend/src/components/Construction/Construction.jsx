import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoConstructOutline } from "react-icons/io5";

const Construction = () => {

  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('no-scroll');
  },[])

  return (
    <div style={{
      position: "fixed",
      top:0,
      background: "black",
      left: 0,
      right: 0,
      zIndex: 10000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "3rem",
      height: '100vh',
      flexDirection: 'column'
    }}>
      <h1> 
          Still Under Construction
      </h1>
      <button 
      style={{
        padding: "1rem 3rem",
        border:"none",
        borderRadius:'3rem',
        fontSize: '1.4rem',
        margin: '2rem 0',
        cursor: 'pointer'
      }}
      onClick={() => {
        navigate('/');
        document.body.classList.remove('no-scroll');
      }}>
        Back
      </button>
      <IoConstructOutline 
        style={{
          width: '50vw',
          height: '50vw',
          position: 'absolute',
          zIndex: '-1',
          opacity: '.35'
        }}
      />
      </div>
  )
}

export default Construction