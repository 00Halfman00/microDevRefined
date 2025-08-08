const LandingPage = ({ currentUser }) => {
  console.log(
    'I am the LandingPage component sent to the browser: ',
    currentUser
  );
  //axios.get('/api/users/currentuser');
  return (
    <div>
      <h1>You are {currentUser ? '' : 'not'} signed in.</h1>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return currentUser;
};

export default LandingPage;
