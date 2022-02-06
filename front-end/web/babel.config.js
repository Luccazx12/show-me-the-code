module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@components': './src/components',
          '@config': './src/config',
          '@contexts': './src/contexts',
          '@dtos': './src/dtos',
          '@pages': './src/pages',
          '@public': './public',
          '@services': './src/services',
          '@styles': './src/styles',
        },
      },
    ],
    ['styled-components', { ssr: true }],
    'inline-react-svg',
  ],
};
