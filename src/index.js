import express from "express";
import SwaggerUI from "swagger-ui-express";
import YAML from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import OpenApiValidator from "express-openapi-validator";

// === Express Server Setup === 
const app = express();
// = Port Server: localhost =
const port = 3000;

// = Mega Root Absolute Path | Yaml file location =
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

// = Load OpenAPI specification from YAML file | Watch in Web Browser (Swagger) =
const swaggerDocument = YAML.load(
  readFileSync(path.join(__dirname, `../openAPI/api.yaml`), `utf8`),
);

// = In-Memory Users Storage; =
const users = []; 

// = Swagger UI Setup | API Documentation = 
app.use(`/api-docs`, SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

// = Middleware to parse JSON Bodies = 
app.use(express.json()); 

const apiSpecPath = path.join(__dirname, `../openAPI/api.yaml`);

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpecPath,
    ignorePaths: /api-docs/,
    validateRequests: true, // Validate request: body, query, params
    validateResponses: true, // Validate Response
  }),
);

// ================= =========  === API EndPoints | CRUD ===  =========  ================= //

// = GET (hello) =   
app.get(`/hello`, (req, res) => {
  res
    .status(200)
    .json({ message: `Hello World with OpenAPI 3.1.1 | API First` });
});
// = POST (User) =
app.post(`/user`, (req, res) => {
  const { name, email } = req.body;
  const errors = {}; // - Object To store validation errors -

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
  };

  users.push(newUser);

  // = Validation Logic =
  if (!name) {
    errors.name = `name is required`;
  }

  if (!email) {
    errors.email = `email is required`;
  }

  res.status(201).json({
    message: `User Created Successfully`,
    user: newUser,
  });

  // = If There are errors | Send request 400 =
  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      message: `Bad Request | Invalid Request body`,
      errors: errors,
    });
  }
});
// = GET (User) =
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
// = Listen PORT =
app.listen(port, () => {
  console.log(`Server is running in port ${port} | Production server`);
  console.log(`OpenAPI Documentation is Available ar /api-docs`);
  console.log(`Open API Specification is Available at ${apiSpecPath}`);
});
