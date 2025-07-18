import express from "express";
import SwaggerUI from "swagger-ui-express";
import YAML from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import pkg from "express-openapi-validator";
const { OpenApiValidator } = pkg; // Open API Validator | Come Common Js

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Mega Root Absolute Path | Yaml

const swaggerDocument = YAML.load(
  readFileSync(path.join(__dirname, `../openAPI/api.yaml`), `utf8`),
);

app.use(`/api-docs`, SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

const apiSpecPath = path.join(__dirname, `../openAPI/api.yaml`); 

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpecPath,
    validateRequests: true, // Validate request: body, query, params
    validateResponses: true, // Validate Response
  }),
);

app.get(`/hello`, (req, res) => {
  res
    .status(200)
    .json({ message: `Hello World with OpenAPI 3.1.1 | API First` });
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
