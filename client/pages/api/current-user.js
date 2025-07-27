import axios from 'axios';

export default async function handler(req, res) {
  console.log('API route handler - received headers:');
  try {
    const backendResp = await axios.get(
      'http://auth-clusterip-srv:3000/api/users/currentuser',
      {
        headers: req.headers,
      }
    );
    res.status(backendResp.status).json(backendResp.data);
  } catch (err) {
    console.error('Error proxying currentuser request: ', err.message);
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { message: 'Failed to fetch currentuser' });
  }
}

// LandingPage.getInitialProps = async ({ req }) => {
//   // req context is important for server-side
//   console.log('I run in the backend server');
//   try {
//     let response;
//     if (typeof window === 'undefined') {
//       response = await axios.get(
//         'http://auth-clusterip-srv:3000/api/users/currentuser',
//         {
//           headers: req ? req.headers : undefined,
//         }
//       );
//     } else {
//       response = await axios.get('/api/users/currentuser');
//     }
//     return { currentUser: response.data };
//   } catch (err) {
//     console.error('Error in getInitialProps:', err.message, err.response?.data);
//     return { currentUser: null };
//   }
// };

// export default LandingPage;
