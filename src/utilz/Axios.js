import Axios from 'axios';

// Request interceptor
Axios.interceptors.request.use(
  (config) => {
    // Add access token to Authorization header before sending request
    config.headers.Authorization = `Bearer ${localStorage.getItem('access')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refresh');
    // If access token expired or not valid, and there is refresh toke in local storage, send request to get new access token
    // console.log(originalRequest.get('_retry'))
    // console.log(originalRequest['_retry'])
    console.log(originalRequest)
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
    //   originalRequest._retry = false;
      originalRequest._retry = true;

      console.log(originalRequest)

      return Axios.post(`${process.env.REACT_APP_API_URL}/api/token/refresh/`, {
        refresh: refreshToken,
      }).then((res) => {
        if (res.status === 200) {
          // If refresh token is valid, store access & refresh tokens sent back from api in local storage
          localStorage.setItem('access', res.data.access);
          localStorage.setItem('refresh', res.data.refresh);
          console.log('retrying')
          // Resend original request
          return Axios(originalRequest);
        }
      });
    }
    return Promise.reject(error);
  }
);

export default Axios;
