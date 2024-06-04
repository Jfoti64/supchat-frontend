import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.svg$': 'jest-transform-stub',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
