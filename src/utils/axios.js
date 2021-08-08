// axios
import axios from 'axios';

const api = axios.create();
const viacep = axios.create();

api.defaults.baseURL = process.env.REACT_APP_URL_API;
api.defaults.headers.authorization =
  'Basic lEo15jYfnTSgBO5s9Y1amu9772J3r7DMdKznIRmNBpX2EO7eYTJob3186P5Wth0euZzByJVa7EERLbUGTbVUqsbEw5WoK0Oi9WJv4kyNglOTtFmn47xbrilPqf49dpNSw8hawH6xGKtzPYdTvsEQh6sHCVPyIA8TiynhgA6vGdnCZlRFZ1JO0ucBfg3laIACORyoTWP8ZF1pvWuwZV4pviC15ChMJwy6WxZCNtjiokboaw1H3TCJq1uoSXXB7dnO';
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
