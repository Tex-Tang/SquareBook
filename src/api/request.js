import axios from 'axios'
import router from '../router/index'

let apiUrl = '/api/'
if (process.env.VUE_APP_API_URL) {
  apiUrl = process.env.VUE_APP_API_URL
} else {
  if (process.env.NODE_ENV !== 'production') {
    apiUrl = 'http://dev.squarebook.my/api/'
  }
}

const service = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  responseType: 'json',
  transformRequest: [function (data, headers) {
    if (data && data.images) {
      const formData = new FormData()
      buildFormData(formData, data)
      return formData;
    }
    return data;
  }, ...axios.defaults.transformRequest]
})

service.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error)
  if (error.response.status == 401) {
    router.push("/login")
  }
  return Promise.reject(error);
});

function buildFormData(formData, data, parentKey = '') {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
    Object.keys(data).forEach(key => {
      buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
    });
  } else {
    const value = data == null ? '' : data;
    formData.append(parentKey, value);
  }
}



export default service