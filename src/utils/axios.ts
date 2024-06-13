import axios from 'axios';
import Cookies from "js-cookie";
const api = axios.create({ baseURL: 'http://localhost:3001' });


api.interceptors.request.use(
  (config) => {
  let accessToken = Cookies.get("access_token");
    if (!accessToken) {
      accessToken = "";
    }
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
      config.headers!["Access-Control-Allow-Origin"] = "*";
      config.headers!["Access-Control-Allow-Credentials"] = "true";
    }
    return config;
  },
  (err) => Promise.reject(err)
);
api.interceptors.response.use((response:any) => {
  return response
}, async function (error:any) {
  const originalRequest = error.config;
  if (error.response && error.response.status === 403 && !originalRequest._retry) {
    Cookies.remove('access_token')
  }
  return Promise.reject(error);
});


const apiCalls = {

  /* Authentication Routes */
  login: (data: any) => api.post('/auth/login', data),

}


export default apiCalls;