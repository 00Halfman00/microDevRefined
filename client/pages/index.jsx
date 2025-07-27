import Bananas from './bananas';
import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log('I am a component sent to the browser: ', currentUser);
  //axios.get('/api/users/currentuser');
  return (
    <div>
      <h1>
        You are now experiencing the power of Server Side Rendering via NextJS
      </h1>
      <p>
        This is the main page of our application, running in a Docker container.
      </p>
      <a href="/bananas">Go to Bananas Page</a>
      <Bananas />
    </div>
  );
};

LandingPage.getInitialProps = async (context) => {
  const baseURL =
    typeof window === 'undefined'
      ? 'http://client-clusterip-srv:3000' // Your own service's internal name
      : '';
  try {
    const response = await axios.get(`${baseURL}/api/current-user`, {
      headers: context.req ? context.req.headers : undefined,
    });
    return { currentUser: response.data };
  } catch (err) {
    console.error('Erro fetching currentuser in getInitialProps', err);
    return { currentUser: null };
  }
};

export default LandingPage;
