// --- import third-party modules/libraries ---
import { useState } from 'react';
// --- import local hook ---
import useRequest from '../../hooks/use-request';

function Signup() {
  // email and password need to be at least a string with one space
  // This is to ensure that the input fields are not empty when the form is submitted
  // and the hook can handle the request properly
  // The initial state is set to a single space to avoid empty string issues
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientErrors, setClientErrors] = useState([]);
  // State to manage form validity, used to disable the submit button
  const [isFormValid, setIsFormValid] = useState(false);
  // state to manage rendering of error messages
  // This state is used to control the visibility of error messages in the UI
  // It is set to true when the form is submitted and there are errors to display
  // const [flag, setFlag] = useState(false);

  const { authErrors, setAuthErrors, sendRequest } = useRequest({
    url: '/api/users/signup',
    method: 'POST',
    setLoading: setIsFormValid,
  });

  const isButtonDisabled = isFormValid || !email || !password;

  // Validate form fields and submit the form
  const validateAndHandleSubmit = async (e) => {
    e.preventDefault();
    // --- Reset errors before validation ---
    const tmpErrors = [];
    setClientErrors([]);
    setAuthErrors([]);
    // setFlag(false);

    // -*- Client-side validation, first -*-
    if (!email || !email.includes('@')) {
      tmpErrors.push('Please enter a valid email address.');
    }
    if (!password) {
      tmpErrors.push('Please enter a password.');
    }
    // --- Add length checks to mirror backend ---
    if (password && (password.length < 8 || password.length > 20)) {
      tmpErrors.push('Password must be between 8 and 20 characters.');
    }
    console.log('tmpErrors', tmpErrors);

    if (tmpErrors.length > 0) {
      setClientErrors(tmpErrors);
      // Stop form submission if there are client-side errors
      return;
    }

    // -*- Proceed with backend call only if client-side validation passes -*-
    // -*- to avoid unnecessary network calls -*-

    // --- Reset client errors before making the request ---
    setClientErrors([]);
    // --- Call the sendRequest function from the useRequest hook ---
    // This will make the API call to the backend to create a new user
    // The response will be handled by the hook, which will set loading state and errors as necessary
    // Await the response to ensure the request is completed before proceeding
    // setFlag(true);
    const response = await sendRequest({ email, password });
    setEmail('');
    setPassword('');
    console.log('authErrors', authErrors);
    // console.log('flag', flag);
  };

  // --- Return JSX to render the signup form ---
  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={validateAndHandleSubmit}>
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isButtonDisabled}
          >
            Sign Up
          </button>
          {clientErrors.length > 0 && (
            <div className="alert alert-danger mt-3">
              <ul className="mb-0">
                {clientErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          {authErrors && authErrors.length > 0 && (
            <div className="alert alert-danger mt-3">
              <ul className="mb-0">
                {authErrors.map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}
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
// It uses the `useState` hook to manage form state and errors.
// The form includes client-side validation to ensure the email is valid and the password meets length requirements
// The `useRequest` hook is used to handle the API request for signing up a new user.
// The form submission is handled by the `validateAndHandleSubmit` function, which validates the form fields,
// sets client-side errors if validation fails, and calls the `sendRequest` function from the `useRequest` hook if validation passes.
// The component returns JSX that renders the form, including input fields for email and password, a submit button, and error messages if any validation errors occur.
//// The form is styled using Bootstrap classes for a consistent look and feel.
// The component is exported as the default export of the module, making it available for use in other parts of the application.
// The component is designed to be used in a React application, specifically in the context of user authentication.
