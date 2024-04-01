const path = require('path');

const frameworkPath = path.resolve(__dirname, './src/modules');

const frameworkAlias = {
  'react-native-linear-gradient': path.resolve(frameworkPath, 'LinearGradient'),
};

const moduleResolverConfig = {
  root: path.resolve('./'),
  alias: {
    ...frameworkAlias,
    '@assets': path.join(__dirname, 'src/assets'),
    '@components': path.join(__dirname, 'src/components'),
    '@constants': path.join(__dirname, 'src/constants'),
    '@containers': path.join(__dirname, 'src/screens'),
    '@helpers': path.join(__dirname, 'src/helpers'),
    '@models': path.join(__dirname, 'src/models'),
    '@modules': path.join(__dirname, 'src/modules'),
    '@navigation': path.join(__dirname, 'src/navigation'),
    '@services': path.join(__dirname, 'src/services'),
    '@theme': path.join(__dirname, 'src/theme'),
  },
};

module.exports = function (api) {
  api.cache(true);

  const presets = ['babel-preset-expo'];

  const plugins = [
    ['module-resolver', moduleResolverConfig],
    ['react-native-reanimated/plugin'],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ];

  return {
    presets,
    plugins,
  };
};
