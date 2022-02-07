import axios from 'axios';
import { parseCookies } from 'nookies';
import appConfig from '@config/config';

import { IHeaders } from 'types/iHeaders';

function getAPIClient(ctx?: unknown) {
  const { 'nextauth.token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: appConfig.serverURL,
  });

  api.interceptors.request.use(config => config);

  if (token) {
    const headerApi: IHeaders = api.defaults.headers;
    headerApi.authorization = `Bearer ${token}`;
  }

  return api;
}

export default getAPIClient;
