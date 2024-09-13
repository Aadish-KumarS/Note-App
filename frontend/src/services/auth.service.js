import axios from 'axios'; 

export const handleSubmit = async (e,formValidation,formData,setErrors,setSuccessMessage,setErrorMessage,setFormData) => {
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
    const response = await axios.post( 'http://localhost:5001/api/auth/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    // const { token } = response;
    console.log(response)
    // localStorage.setItem('authToken', token);

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