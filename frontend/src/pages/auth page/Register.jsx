import { useState } from 'react';
import '../styles/auth.pages.css';
import { FaRegUser } from "react-icons/fa";
import { MdMailOutline, MdPassword } from "react-icons/md";
import { formValidation } from '../../utils/formValidation';
import { handleSubmitRegister } from '../../services/auth.service';
import {Link, useNavigate} from 'react-router-dom'


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };





  return (
    <div className="register">
      <form 
        className='register-form' 
        onSubmit={(e) =>{
          handleSubmitRegister(e,formValidation,formData,setErrors,setSuccessMessage,setErrorMessage,setFormData)
          navigate('/')
        }}
      >
        <h1>User Register</h1>
        <div className="form-group">
          <label htmlFor="name">
            <FaRegUser className='icon' /> Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <MdMailOutline className='icon' /> Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <MdPassword className='icon' /> Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">
            <MdPassword className='icon' /> Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <button className='submit-btn' type="submit">Register</button>

        {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
      <Link to={'/login'}>
        Alerady a user? <span>Login</span>
      </Link>
      <Link to={'/'}>
        Back
      </Link>
    </div>
  );
}

export default Register;
