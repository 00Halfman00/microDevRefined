import 'bootstrap/dist/css/bootstrap.min.css';

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;

// This is the custom App component for a Next.js application.
// It imports Bootstrap CSS for styling and renders the main component with its props.
// The App component is used to initialize pages and can be customized to include global styles or layouts.
// In this case, it simply applies Bootstrap styles to all pages in the application.
// The Component prop represents the active page, and pageProps are the initial props preloaded for the page.
// This setup allows for consistent styling across the application using Bootstrap's CSS framework.
// The App component is essential for Next.js applications to manage page transitions and global state.
// The import statement at the top ensures that Bootstrap's styles are available throughout the app.
// The App component can also be extended to include additional functionality, such as global state management or
// context providers, if needed in the future.
