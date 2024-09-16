import axios from 'axios'; 


export const handleSubmitRegister = async (e,formValidation,formData,setErrors,setSuccessMessage,setErrorMessage,setFormData) => {
  e.preventDefault();
  const validationErrors = formValidation(formData);

  // Check for validation errors
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
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
    setSuccessMessage('Registration successful!');
    setErrorMessage('');
    setErrors({});
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  } catch (error) {
    // Handle API errors
    setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    setSuccessMessage('');
    console.error('API Error:', error); // Optional: Log the error for debugging
  }
};


export const handleSubmitLogin = async (e,formData,setSuccessMessage,setErrorMessage,setFormData) => {
  e.preventDefault();


  try {
    // Make API request to login
    const response = await axios.post('http://localhost:5001/api/auth/login', formData); 
    const { token } = response.data;

    console.log(token)
    // Save token to localStorage or cookies
    localStorage.setItem('authToken', token);

    setSuccessMessage('Login successful!');
    setErrorMessage('');
    // Reset form data
    setFormData({ email: '', password: '' });

    // Redirect to a protected route if needed (e.g., dashboard)

  } catch (error) {
    console.error(error);
    setErrorMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
    setSuccessMessage('');
  }
};