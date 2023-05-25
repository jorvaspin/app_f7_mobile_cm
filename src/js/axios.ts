import { store } from '@/store/store';
import axios from 'axios';
import { f7 } from 'framework7-vue';

// let enviroment = process.env;
let baseUrl = null;

switch (process.env.NODE_ENV) {
  case 'development':
  default:
    baseUrl = import.meta.env.VITE_BASE_URL_DEVELOPMENT;
    break;
  case 'production':
    baseUrl = import.meta.env.VITE_BASE_URL_PRODUCTION;
    break;
}

console.log('Established baseUrl', baseUrl);

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'X-Requested-With'
  }
});

//INSTANCE PARA TRAER LA DATA DE LA PLATAFORMA DE AYUDA CIVICAMENTE.
const axiosHCInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + store.state.settings.HC_API_KEY,
  }
});

const axiosApiInstance = axios.create({
  baseURL: baseUrl,
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('cm_access_token')
  }
});

axiosApiInstance.interceptors.request.use(
  async config => {
    const access_token = localStorage.getItem('cm_access_token')
    config.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

axiosApiInstance.interceptors.response.use((response) => {
  f7.dialog.close();
  if (response.status === 401) {
    // alert("No estás ");
    f7.dialog.alert('No estás autorizado');
    f7.views.main.router.navigate('/login/');
  }
  return response;
}, (error) => {
  // trigger 'loading=false' event here
  return Promise.reject(error);
});

export { axiosInstance, axiosApiInstance };
