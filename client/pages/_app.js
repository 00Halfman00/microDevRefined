import 'bootstrap/dist/css/bootstrap.min.css';
import buildClient from '../lib/buildClient';
import Header from '../components/header';
import '../styles/header.css';

function AppComponent({ Component, pageProps, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  );
}

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  let currentUser = null;
  try {
    const { data } = await client.get('/api/current-user');
    currentUser = data.currentUser;
  } catch (err) {
    console.log(
      'Error fetching current user in _app.js, user is not signed in'
    );
  }

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      currentUser
    );
  }

  return {
    pageProps,
    currentUser,
  };
};

export default AppComponent;

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
