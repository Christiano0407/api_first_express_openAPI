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