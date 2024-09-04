import axios from "axios";

function applyToken(token) {
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

// Add request interceptor to include token in headers for all requests
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Or use cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {
  applyToken
};
