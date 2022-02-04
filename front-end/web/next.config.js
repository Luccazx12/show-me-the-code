const withImages = require('next-images');
const devApi = 'http://localhost:3002';
const prodApi = 'http://localhost:3002';

module.exports = withImages({
  images: {
    disableStaticImages: true,
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
