import axios from 'axios';

/**
 * Creates an axios instance
 * @returns {Object} an instance of axios
 */
const axiosInstance = () => {
  let apiUrl = 'https://twilio-gui.herokuapp.com/api';
  if (process.env.NODE_ENV === 'development') {
    apiUrl = 'http://localhost:3002/api';
  }

  let token = '';
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  const instanceCreate = axios
    .create({
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    });
  return instanceCreate;
};

export default axiosInstance;
