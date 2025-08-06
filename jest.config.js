export default {
  preset: 'default',
  testEnvironment: 'node',
  
  // ✅ ES Modules configuration
  extensionsToTreatAsEsm: ['.js'],
  transform: {}, // No transforms needed for ES modules
  
  // ✅ Module mapping for ES modules
  moduleNameMapper: {
    '^@/(.*): '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js: '$1'  // Handle .js extensions
  },
  
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
  
  // ✅ ES Modules specific settings
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
  verbose: false,
  
  // ✅ Evitar warnings de ES modules
  globals: {
    'ts-jest': {
      useESM: true
    }
  }
};