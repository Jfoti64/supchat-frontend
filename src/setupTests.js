// src/setupTests.js
import '@testing-library/jest-dom';

global.importMetaEnv = {
  VITE_API_BASE_URL: 'http://localhost:3000/api',
};

// Mock `import.meta.env`
Object.defineProperty(global, 'import.meta', {
  value: {
    env: global.importMetaEnv,
  },
});
