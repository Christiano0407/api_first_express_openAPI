// ====== Jest Setup for ES Modules ======
import { jest } from '@jest/globals';

// ✅ Configuraciones globales para tests
global.console = {
  ...console,
  // Puedes mockear console.log si generas mucho ruido en tests
  // log: jest.fn(),
};

// ✅ Configurar timezone para tests consistentes
process.env.TZ = 'UTC';

// ✅ Configuración para mocks de ES modules
beforeEach(() => {
  // Los mocks se limpian automáticamente con clearMocks: true en jest.config.js
});

// ✅ Configuraciones para base de datos de test si es necesario
beforeAll(() => {
  // Configuraciones una sola vez antes de todos los tests
});

afterAll(() => {
  // Limpieza después de todos los tests
});