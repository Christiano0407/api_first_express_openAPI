# api_first_express_openAPI

We created an API with the OpenAPI methodology. Use Express Js and Virtual environments.


## Model & Structure To The OpenAPI

> Add: DB: Postgress | Tets: Jest | Mocks & Params (Server Proves)

```Bash

  api_first_express_openapi/
├── openAPI/                         # Tu estructura actual (mantener)
│   ├── api.yaml
│   ├── components/
│   │   ├── parameters/
│   │   │   ├── IdParams.yaml
│   │   │   ├── ProductIDParams.yaml
│   │   │   └── UserIdParams.yaml
│   │   ├── responses/
│   │   │   ├── BadRequest.yaml
│   │   │   ├── NotFoundError.yaml
│   │   │   └── StandardError.yaml
│   │   └── schemas/
│   │       ├── Error.yaml
│   │       ├── HelloWorldResponse.yaml
│   │       ├── Product.yaml
│   │       ├── ProductInput.yaml
│   │       └── User.yaml
│   └── paths/
│       ├── hello.yaml
│       ├── product-by-id.yaml
│       ├── products.yaml
│       ├── user-by-id.yaml
│       └── user.yaml
├── src/                             # Tu código fuente actual
│   ├── controllers/
│   │   ├── productsController.js    # Tu archivo actual
│   │   └── userController.js        # Agregar si no existe
│   ├── lib/                         # Agregar para Prisma
│   │   └── prisma.js
│   ├── routes/
│   │   ├── hello.js
│   │   ├── product.js
│   │   └── user.js
│   ├── db.js                        # Tu archivo actual
│   └── server.js
├── __tests__/                       # Nueva carpeta de tests
│   ├── unit/
│   │   ├── controllers/
│   │   │   ├── productsController.test.js
│   │   │   └── userController.test.js
│   │   └── routes/
│   │       ├── hello.test.js
│   │       ├── product.test.js
│   │       └── user.test.js
│   ├── integration/
│   │   ├── api.test.js
│   │   └── database.test.js
│   └── openapi/
│       └── contract.test.js
├── __mocks__/                       # Mocks globales
│   ├── prisma.js                    # Mock de Prisma Client
│   └── external-services.js         # Para futuras APIs externas
├── prisma/                          # Carpeta de Prisma
│   ├── schema.prisma
│   ├── seed.js
│   └── migrations/
├── scripts/                         # Scripts de utilidad
│   ├── test-setup.js
│   └── db-setup.js
├── .env
├── .env.test
├── jest.config.js                   # Configuración de Jest
├── jest.setup.js
├── package.json
└── package-lock.json

```

## Jest Tests Config 

> Configure process Tests 

```Bash 

export default {
  preset: 'default',
  testEnvironment: 'node',
  transform: {},
  extensionsToTreatAsEsm: ['.js'],
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).js'
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js',
    '!**/__tests__/**',
    '!**/__mocks__/**'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testTimeout: 30000,
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};

```

> Modify Test.config To Work With Babel (Only if you don't not work with Update Node. Las Versions)

```Bash
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

```

## Create Structure  of the Folders

> Folders to the test

```Bash

# Crear carpetas de tests
mkdir -p __tests__/unit/controllers
mkdir -p __tests__/unit/routes  
mkdir -p __tests__/integration
mkdir -p __tests__/openapi

# Crear carpeta de mocks
mkdir -p __mocks__

# Crear carpeta de scripts
mkdir -p scripts

# Crear carpeta lib si no existe
mkdir -p src/lib

```

## Scripts JSON Node | Test

> Update Scripts in Package JSON To Run: Test

```Bash 

  {
    "scripts": {
      // ... tus scripts existentes
      
      // === Testing Scripts (Actualizados) ===
      "test": "NODE_ENV=test jest",
      "test:watch": "NODE_ENV=test jest --watch",
      "test:coverage": "NODE_ENV=test jest --coverage",
      "test:unit": "NODE_ENV=test jest --testPathPattern=unit",
      "test:integration": "NODE_ENV=test jest --testPathPattern=integration",
      "test:openapi": "NODE_ENV=test jest --testPathPattern=openapi",
      "test:controllers": "NODE_ENV=test jest --testPathPattern=controllers",
      "test:routes": "NODE_ENV=test jest --testPathPattern=routes",
      "test:verbose": "NODE_ENV=test jest --verbose",
      "test:debug": "NODE_ENV=test node --inspect-brk node_modules/.bin/jest --runInBand",
      
      // === Database Testing ===
      "test:db:setup": "NODE_ENV=test prisma migrate reset --force && prisma db seed",
      "test:db:teardown": "NODE_ENV=test prisma migrate reset --force"
    }
  }; 

```

## Create Fake Data to Run 'Mocks' with Jest (Proved code )

> Test With Jest 

```javascript

  export const createProductMock = (overrides = {}) => ({
  nombre_producto: 'Laptop Test',
  descripcion_corta: 'Laptop para testing',
  precio_usd: 999.99,
  categoria: 'Electrónica',
  stock_disponible: 10,
  sku: 'TEST-LAP-001',
  fecha_lanzamiento: '2024-01-15',
  activo: true,
  marca: 'TestBrand',
  peso_kg: 2.5,
  dimensiones_cm: '35x25x2',
  valoracion_promedio: 4.5,
  num_valoraciones: 50,
  url_imagen: 'https://test.com/image.jpg',
}); 

// = Create different Products =
export const createMultipleProducts = (count = 3) => {
  return Array.from({ length: count }, (_, index) => 
    createProductMock({
      nombre_producto: `Producto Test ${index + 1}`,
      sku: `TEST-PROD-${String(index + 1).padStart(3, '0')}`,
      precio_usd: 100 + (index * 50)
    })
  );
}; 

// = Create Invalid Product To Invalid test | Crear Producto Inválido para tests de Validación  =
export const createInvalidProduct = (missingField) => {
  const validationProduct = createProductMock(); 
  delete validationProduct[missingField]; 
  return validationProduct; 
}; 

// = Helper: Datos para tests de Error = 
export const getInvalidDataError = () => ({
  priceNegative: createProductMock({precio_usd: -100}),
  stockNegative: createProductMock({stock_disponible: -5}),
  emptyName: createProductMock({nombre_producto: ""}),
  invalidType: createProductMock({precio_usd: "not-a-number"}),
}); 

```