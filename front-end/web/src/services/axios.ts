import axios from 'axios';
import { parseCookies } from 'nookies';
import config from '../config/config';

export function getAPIClient(ctx?: any) {
  const { 'nextauth.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: config.serverURL,
  });

  api.interceptors.request.use(config => {
    console.log(config);

    return config;
  });

  if (token) {
    api.defaults.headers['authorization'] = `Bearer ${token}`;
  }

  return api;
}
