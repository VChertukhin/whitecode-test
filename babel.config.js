module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        // it fails to work with root property
        'alias': {
          '@': '.',
          '@components': './src/components',
          '@interfaces': './src/interfaces',
          '@services': './src/services',
          '@redux': './src/redux',
          '@utils': './src/utils',
        }
      }]
    ],
  };
};
