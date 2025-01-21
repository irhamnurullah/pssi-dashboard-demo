import axios from 'axios';
import sessions from '../sessions';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessions.getSessionToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        localStorage.clear();
        window.location.replace('/login');
      }
      if (status === 404) {
        // window.location.replace('/404');
      }
    }
    // if (error.response.status === 401) {
    //   // Handle unauthorized access, e.g., redirect to login
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
