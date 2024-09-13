export const formValidation = (data) => {
  const { name, email, password, confirmPassword } = data
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^.{2,}$/;
  const passRegex = /^(?=.*\d).{8,}$/;
  const errors = {};

  // Name validation
  if (!name) {
    errors.name = 'Name is required.';
  } else if (!nameRegex.test(name)) {
    errors.name = 'Name must be at least 2 characters long.';
  }

  // Email validation
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // Password validation
  if (!password) {
    errors.password = 'Password is required.';
  } else if (!passRegex.test(password)) {
    errors.password = 'Password must be at least 8 characters long and contain at least one number.';
  }

  // Confirm password validation
  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm password is required.';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
};
