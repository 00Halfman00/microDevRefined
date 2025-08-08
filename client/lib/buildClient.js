import axios from 'axios';

export default function buildClient(buildClientContext) {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://client-clusterip-srv:3000',
      headers: buildClientContext.req?.headers,
    });
  } else {
    return axios.create({ baseURL: '/' });
  }
}
