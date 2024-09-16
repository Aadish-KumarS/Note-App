import '../styles/auth.pages.css'; 
import { MdMailOutline, MdPassword } from "react-icons/md";
import { useState } from 'react';
import {handleSubmitLogin} from '../../services/auth.service'
import {Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="login">
      <form 
        className="login-form" 
        onSubmit={(e) =>{
          handleSubmitLogin(e,formData,setSuccessMessage,setErrorMessage,setFormData)
          navigate('/');
        } }
      >
        <h1>Login</h1>

        <div className="form-group">
          <label htmlFor="email">
            <MdMailOutline className="icon" />Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <MdPassword className="icon" />Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <button className="submit-btn" type="submit">
          Login
        </button>
      </form>
      <Link to={'/profile'}>
        Back
      </Link>
    </div>
  )
}

export default Login