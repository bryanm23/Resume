import axios, { AxiosResponse, AxiosError } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const client = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Ensure cookies are sent with every request
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

// Add request interceptor for debugging
client.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url, {
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Keep track of redirect attempts
let redirectAttempts = 0;
const MAX_REDIRECT_ATTEMPTS = 2;

// Response interceptor for handling errors
client.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('Response received:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error: AxiosError) => {
    console.error('Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    if (error.response?.status === 401) {
      // Only redirect if we haven't exceeded the maximum attempts
      if (redirectAttempts < MAX_REDIRECT_ATTEMPTS && 
          !window.location.pathname.includes('/login') && 
          !window.location.pathname.includes('/signup')) {
        redirectAttempts++;
        window.location.href = '/#/login';
      }
    }
    return Promise.reject(error);
  }
);

// Reset redirect attempts on successful requests
client.interceptors.response.use(
  (response) => {
    redirectAttempts = 0;
    return response;
  }
);

export default client; 