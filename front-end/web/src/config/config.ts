import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default {
  serverURL: publicRuntimeConfig.apiUrl,
  loadingImg: publicRuntimeConfig.apiImageLoading,
  errorImg: publicRuntimeConfig.apiImageError
};
