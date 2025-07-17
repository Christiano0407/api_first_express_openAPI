import express from "express";
import SwaggerUI from "swagger-ui-express";
import YAML from 'js-yaml'; 
const app = express();
const port = 3000;

const swaggerDocument = YAML.load(`../openAPI/api.yaml`);

app.use(`/api-docs`, SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

app.get(`/hello`, (req, res) => {
  res
    .status(200)
    .json({ message: `Hello World with OpenAPI 3.1.1 | API First` });
});

app.listen(port, () => {
  console.log(`Server is running in port ${port} | Production server`);
});
