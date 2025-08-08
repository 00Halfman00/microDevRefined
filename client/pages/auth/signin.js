// --- import third-party modules/libraries ---
import { useState } from 'react';
// --- import local hook ---
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/navigation';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientErrors, setClientErrors] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();
  const { authErrors, setAuthErrors, sendRequest } = useRequest({
    url: '/api/users/signin',
    method: 'POST',
    setLoading: setIsFormValid,
    onSuccess: () => {
      setEmail('');
      setPassword('');
      router.push('/');
    },
  });

  const validateAndHandleSubmit = async (e) => {
    e.preventDefault();
    // --- Reset errors before validation ---
    const tmpErrors = [];
    setClientErrors([]);
    setAuthErrors([]);

    // -*- Client-side validation, first -*-
    if (!email || !email.includes('@')) {
      tmpErrors.push('Please enter a valid email address.');
    }
    if (!password) {
      tmpErrors.push('Please enter a password.');
    }
    if (password && (password.length < 8 || password.length > 20)) {
      tmpErrors.push('Password must be between 8 and 20 characters.');
    }
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
    // Await the response to ensure the request is completed before proceeding
    await sendRequest({ email, password });
  };

  // --- Return JSX to render the signup form ---
  return (
    <div className="container">
      <h1>Sign In</h1>
      <form onSubmit={validateAndHandleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            autoComplete="email"
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
            name="password"
            placeholder="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isFormValid || !email || !password}
          >
            Sign In
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

export default Signin;
