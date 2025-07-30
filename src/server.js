import express from "express";
import dotenv from "dotenv"; 
import cors from "cors"; 
import SwaggerUI from "swagger-ui-express";
import YAML from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import OpenApiValidator from "express-openapi-validator";
import productRoutes from "./routes/product.js"; 
import helloRoutes from "./routes/hello.js"; 
import userRoutes from "./routes/user.js"; 

// === Express Server Setup ===
const app = express();
// = Mega Root Absolute Path | Yaml file location =
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// = env (Variable Environment ENV) = 
dotenv.config(); 
// = Load OpenAPI specification from YAML file | Watch in Web Browser (Swagger) =
const swaggerDocument = YAML.load(
  readFileSync(path.join(__dirname, `../openAPI/api.yaml`), `utf8`),
);
// = Swagger UI Setup | API Documentation =
app.use(`/api-docs`, SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));
// === Middleware to parse JSON Bodies | Parse (Data Structure) ===
app.use(express.json());
app.use(cors()); 

const apiSpecPath = path.join(__dirname, `../openAPI/api.yaml`);

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpecPath,
    ignorePaths: /api-docs/,
    validateRequests: true, // Validate request: body, query, params
    validateResponses: true, // Validate Response
  }),
);
// === Routes Products ===
app.use(`/api/v1/hello`, helloRoutes); 
app.use(`/api/v1/user`, userRoutes); 
app.use(`/api/v1/product`, productRoutes);
// = Port Server: localhost =
const PORT = process.env.PORT || 3000; 

// ================= =========  === API EndPoints | CRUD ===  =========  ================= //
// = GET (API) =
app.get(`/`, (req, res) => {
  res.json({ message: `¡Welcome! This is a my first API with OpenAPI`}); 
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
      errors: { general: err.message || `Something went wrong` },
    });
  }
});
// = Listen PORT =
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT} | Production server`);
  console.log(`OpenAPI Documentation is Available ar /api-docs`);
  console.log(`Open API Specification is Available at ${apiSpecPath}`);
  console.log(`Access Tp API to hello in http://localhost:${PORT}/api/v1/hello`); 
});
