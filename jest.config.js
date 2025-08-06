export default {
  testEnvironment: 'node',
  // ✅ Añadir soporte para Babel si es necesario
  transform: {
    "^.+\\.js$": "babel-jest"
  },

  // ✅ Corrección aquí
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },

  modulePathIgnorePatterns: [
  "<rootDir>/src/openapi.js",
  "<rootDir>/src/swagger.js"
  ],


  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],

  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!src/db.js',
    '!**/__tests__/**',
    '!**/__mocks__/**',
    '!**/__setup__/**'
  ],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testTimeout: 30000,

  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
  verbose: false
};
