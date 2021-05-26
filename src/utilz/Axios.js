import Axios from 'axios';

Axios.interceptors.request.use(
  (config) => {
      // Add access token to Authorization header before sending request 
    config.headers.Authorization = `Bearer ${localStorage.getItem('access')}`;
    return config;
  },
  (error) => {
      return Promise.reject(error)
  }
);


export default Axios;