import '@testing-library/jest-dom';

// Mock `import.meta.env`
global.importMetaEnv = {
  VITE_API_BASE_URL: 'http://localhost:3000/api',
};

Object.defineProperty(global, 'import.meta', {
  value: {
    env: global.importMetaEnv,
  },
});
