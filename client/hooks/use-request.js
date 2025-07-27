import { useState } from 'react';
import axios from 'axios';

function useRequest({ url, method, setLoading, onSuccess }) {
  const [authErrors, setAuthErrors] = useState([]);

  const sendRequest = async (requestBody) => {
    if (setLoading) {
      setLoading(true);
    }
    setAuthErrors([]);
    // Check if the URL is valid
    if (!url || typeof url !== 'string') {
      if (setLoading) setLoading(false);
      throw new Error('Invalid URL provided to useRequest hook');
    }
    // Check if the method is valid
    if (
      !method ||
      typeof method !== 'string' ||
      !['GET', 'POST', 'PUT', 'DELETE'].includes(method.toUpperCase())
    ) {
      if (setLoading) setLoading(false);
      throw new Error('Invalid HTTP method provided to useRequest hook');
    }
    // Check if the body is an object for password and email properties
    if (requestBody && typeof requestBody !== 'object') {
      if (setLoading) setLoading(false);
      throw new Error('Body must be an object');
    }

    // Make the API request using axios
    try {
      const response = await axios[method.toLowerCase()](url, requestBody);
      // Is this check necessary?
      if (!response.data) {
        throw new Error('No data received'); // Handle case where response is empty
      }
      if (setLoading) {
        setLoading(false);
      }
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      if (setLoading) setLoading(false);
      if (err.response && err.response.data && err.response.data.errors) {
        setAuthErrors(err.response.data.errors);
      } else {
        setAuthErrors([{ message: 'An unexpected error occurred.' }]); // Generic fallback
      }
    }
    // Return null if the request fails
    // This allows the calling component to handle the error gracefully
    return null;
  };

  return { authErrors, setAuthErrors, sendRequest };
}

export default useRequest;

// This hook can be used in any component that needs to make API calls
// It abstracts the logic for making requests, handling loading states, and managing errors
// The `sendRequest` function can be called with the necessary parameters to make the API call
// The hook returns the `sendRequest` function and any errors that occur during the request
// This allows components to focus on their specific logic without worrying about the underlying request handling
// The hook can be easily extended to include additional functionality, such as request cancellation or retries
// It can also be used with different HTTP methods (GET, POST, etc.) by passing the appropriate parameters
// The hook is designed to be reusable and composable, making it a valuable utility for managing API requests in a React application
// It can be used in various contexts, such as form submissions, data fetching, or any other scenario where API calls are needed
