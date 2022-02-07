import axios from 'axios';
import appConfig from '@config/config';

const api = axios.create({
  baseURL: appConfig.serverURL,
});
export default api;
