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

// = Middleware to parse JSON Bodies | Parse (Data Structure) =
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

// = PUT (/user/{id}) Update User =
app.put(`/user/:id`, (req, res) => {
  const { id } = req.params; // Get ID of parameters of URL
  const { name, email } = req.body; // GET the Data of Body request
  const errors = {};
  const updateFields = {};
  const userIndex = users.findIndex((user) => user.id === id); // Find User By ID

  // == Not Found User ==
  if (userIndex === -1) {
    return res.status(404).json({ message: `User Not Found` });
  }

  // = Validation name of user =
  if (name !== undefined) {
    if (typeof name !== `string` || name.trim() === ``) {
      errors.name = `name must be a non-empty string`;
    } else {
      updateFields.name = name;
    }
  }

  // Validate Email Of User
  if (email !== undefined) {
    if (typeof email !== `string` || email.trim() === ``) {
      errors.email = `email must be a non-empty string`;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = `email format is invalid`;
    } else {
      updateFields.email = email;
    }
  }

  // Errors Of Validations To Fields, send 400 (status)
  if (Object.keys(updateFields).length > 0) {
    return res.status(400).json({
      message: `Bad Request | Invalid Request Body`,
      user: users[userIndex],
    });
  }

  // Not Have Fields To Update | Request To Return successfully (200)
  if (Object.keys(updateFields).length > 0) {
    return res.status(200).json({
      message: `Not Fields provided for update or no change mode`,
      user: users[userIndex],
    });
  }

  // - Update User -
  users[userIndex] = { ...users[userIndex], ...updateFields };

  // = Send the response '200' (status) OK, with the User Update =
  res.status(200).json({
    message: `User Update successfully`,
    user: users[userIndex],
  });
});

// - Delete (users/{id}) Delete User -
app.delete(`/user/:id`, (req, res) => {
  const { id } = req.params;

  const findIndex = users.findIndex((user) => user.id === id);

  if (findIndex === -1) {
    return res.status(400).json({
      message: `User Not Found`,
    });
  }

  users.splice(findIndex, 1);

  res.status(204).send(); // Not Content
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
