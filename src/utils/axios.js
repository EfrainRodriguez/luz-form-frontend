// axios
import axios from 'axios';

const api = axios.create();
const viacep = axios.create();

api.defaults.baseURL = process.env.REACT_APP_URL_API;
api.defaults.headers.authorization = process.env.REACT_APP_TOKEN;
viacep.defaults.baseURL = 'https://viacep.com.br';

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export { api, viacep };
