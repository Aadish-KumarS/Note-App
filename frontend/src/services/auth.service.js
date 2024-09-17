import axios from 'axios'; 


export const handleSubmitRegister = async (e,formValidation,formData,setErrors,setSuccessMessage,setErrorMessage,setFormData) => {
  e.preventDefault();
  const validationErrors = formValidation(formData);

  // Check for validation errors
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    console.log('yes')
    setSuccessMessage('');
    setErrorMessage('Registration failed. Please correct the errors.');
    return;
  }

  try {
    // API request to register user (adjust URL and request body as per your backend)
    await axios.post( 'http://localhost:5001/api/auth/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    // Success response
    console.log('yes 555')
    setSuccessMessage('Registration successful!');
    setErrorMessage('');
    setErrors({});
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  } catch (error) {
    const { status, data } = error.response;
    console.log('no')
    if (status === 400 && data.message === 'Email already in use') {
      setErrorMessage('This email is already registered. Please use a different email.');
    } else if (status === 400 && data.message === 'Passwords do not match') {
      setErrorMessage('Passwords do not match. Please check and try again.');
    } else if (status === 400 && data.message === 'Validation error') {
      setErrorMessage('Validation error. Please check the entered data.');
    } else {
      setErrorMessage(data.message || 'Registration failed. Please try again.');
    }
    setSuccessMessage('');
  } 
    
};


export const handleSubmitLogin = async (e,formData,setSuccessMessage,setErrorMessage,setFormData) => {
  e.preventDefault();

  const { email, password } = formData;

  if (!email || !password) {
    setErrorMessage('Email and password are required.');
    return;
  }

  try {
    const response = await axios.post('http://localhost:5001/api/auth/login', formData); 
    const { token } = response.data;

    console.log(response.data)
    if(!response.data.user.isVerified){
      console.log(response.data.user.isVerified)
      setErrorMessage('Mail is not verfied.');
      return
    }

    localStorage.setItem('authToken', token);

    setSuccessMessage('Login successful!');
    setErrorMessage('');
    setFormData({ email: '', password: '' });

  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 404 && data.message === 'User not found') {
        setErrorMessage('User not found. Please sign up.');
      } else if (status === 401 && data.message === 'Incorrect password') {
        setErrorMessage('Incorrect password. Please try again.');
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } else {
      setErrorMessage('An error occurred during login. Please try again later.');
    }
    setSuccessMessage('');
  }
};