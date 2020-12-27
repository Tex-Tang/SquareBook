import axios from 'axios'
import router from '../router/index'

const service = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,
  responseType: 'json',
})

service.interceptors.response.use(function (response) {
  return response;
}, function (error) { 
  if (error.response.status == 401) {
    router.push("/login")
  }
  return Promise.reject(error);
});

export default service