import express from "express";
import SwaggerUI from "swagger-ui-express";
import YAML from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import OpenApiValidator from "express-openapi-validator";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Mega Root Absolute Path | Yaml
// == Load OpenAPI Specification from YAML File To WEB == //
const swaggerDocument = YAML.load(
  readFileSync(path.join(__dirname, `../openAPI/api.yaml`), `utf8`), 
);

const users = []; // In-Memory Users Storage;

app.use(`/api-docs`, SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

app.use(express.json()); // Middleware to parse JSON Bodies

const apiSpecPath = path.join(__dirname, `../openAPI/api.yaml`); // == Root Absolute Path Open API  == //
// == OpenAPI Validator Middlewares | Request == //
app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpecPath,
    ignorePaths: /api-docs/,
    validateRequests: true, // Validate request: body, query, params
    validateResponses: true, // Validate Response
  }),
);

// ================= ==== OPEN API EndPoints [GET | POST | UPDATE | DELETE] ==== ================= //

app.get(`/hello`, (req, res) => {
  res
    .status(200)
    .json({ message: `Hello World with OpenAPI 3.1.1 | API First` });
});

app.post(`/user`, (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({
    message: `User Created Successfully`,
    user: newUser,
  });

});

app.get(`/user`, (req, res) => {
  res.status(200).json(users);
});

// = Middleware To Handle Validation Errors =
app.use((err, req, res, next) => {
  if (err.status & err.errors) {
    res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  } else {
    res.status(500).json({
      message: `Internal Server Error`,
      errors: err.message || `Something went wrong`,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running in port ${port} | Production server`);
  console.log(`OpenAPI Documentation is Available ar /api-docs`);
  console.log(`Open API Specification is Available at ${apiSpecPath}`);
});
