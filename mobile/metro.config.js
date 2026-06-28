const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Redirect expo-health (a non-functional stub) to our local mock
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'expo-health': path.resolve(__dirname, 'src/mocks/expo-health.ts'),
};

module.exports = config;
