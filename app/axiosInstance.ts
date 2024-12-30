import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true // Ensure cookies are sent with requests
});

axiosInstance.interceptors.request.use(
  config => {
    const token = Cookies.get('test');
    console.log('Token from test:', token); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Authorization header set:', config.headers['Authorization']);
    } else {
      console.log('No token found');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;