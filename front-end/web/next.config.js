/* eslint-disable @typescript-eslint/no-var-requires */
const withImages = require('next-images');

const devApi = process.env.APIDEV_URL;
const prodApi = process.env.APIPROD_URL;

module.exports = withImages({
  images: {
    disableStaticImages: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === 'development'
        ? devApi // development api
        : prodApi, // production api
    apiImageLoading: `${
      process.env.NODE_ENV === 'development' ? devApi : prodApi
    }/files/default/loadingImage.png`,
    apiImageError: `${
      process.env.NODE_ENV === 'development' ? devApi : prodApi
    }/files/default/errorImage.png`,
  },
});
