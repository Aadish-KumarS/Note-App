import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/auth.pages.css';
import { GiConfirmed } from "react-icons/gi";


const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state || !location.state.fromRegistration) {
    navigate('/profile/login'); // Redirect to login or another appropriate page
    return null;
  }

  return (
    <div className="confirmation">
      <div className='confirmation-container'>
        <GiConfirmed className='tick-icon' />
        <h1 className="confirmation-heading">🎉 Hooray, You're Almost There! 🎉</h1>
        <p className="confirmation-message">
          <strong> Hi there! We've just sent you a magical email. 🧙‍♂️✨</strong>
          <br />
          Check your inbox (and maybe your spam folder) for an email from us. Click the verification link in the email to unlock your new account!
          <br />
          If you don't see the email, don’t worry—sometimes it takes a minute to arrive. Give it a moment and try again.
        </p>
        <p className="confirmation-next-steps">
          While you wait, feel free to:
          <ul>
            <li>🍿 Grab a snack</li>
            <li>🚀 Explore other features</li>
          </ul>
        </p>
        <div className="confirmation-footer">
          <Link to="/profile/login" className="confirmation-button">Back to Login</Link>
        </div>
      </div>
      
    </div>
  )
}

export default Confirmation