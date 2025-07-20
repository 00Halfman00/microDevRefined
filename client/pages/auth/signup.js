import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = null;
    let data = null;
    try {
      response = await axios.post('/api/users/signup', {
        email,
        password,
      });
      data = response.data;
    } catch (error) {
      console.error('ERROR CAUGHT - NO MODAL SHOULD APPEAR NOW:', error);
    }
    // Handle successful signup, e.g., redirect to login or show a success message
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

// This is the Sign Up page for the application.
// It includes a simple form with fields for email and password.
// The form uses Bootstrap classes for styling and layout.
// The `Signup` component is a functional component that returns JSX for rendering the sign-up form
// The form includes validation attributes to ensure the fields are filled out before submission.
// The `Signup` component can be extended to include additional functionality, such as form submission handling
// and integration with a backend service for user registration.
