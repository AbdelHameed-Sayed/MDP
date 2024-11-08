module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        alias: {
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@atoms': './src/components/atoms',
          '@molecules': './src/components/molecules',
          '@organisms': './src/components/organisms',
          '@modals': './src/components/modals',
          '@templates': './src/components/templates',
          '@navigation': './src/navigation',
          '@utils': './src/utils',
          '@store': './src/store',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
