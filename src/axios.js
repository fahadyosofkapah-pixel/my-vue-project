 import axios from 'axios';
 axios.defaults.baseURL = 'http://localhost:8000'; // Set your base URL here

 axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

//request interceptor
axios.interceptors.request.use(
  (config) => {
    console.log('request:', config.url);
    return config;
  },
)
axios.interceptors.response.use(
    (response) => response,
)

// response interceptor