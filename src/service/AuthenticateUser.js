import axios from "axios";

function applyToken(token) {
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {
  applyToken
};
