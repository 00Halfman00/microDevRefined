import axios from 'axios';

export default async function currentUser(req, res) {
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
