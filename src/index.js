import express from "express";
import SwaggerUI from "swagger-ui-express";
import YAML from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Mega Root Absolute Path | Yaml

const swaggerDocument = YAML.load(
  readFileSync(path.join(__dirname, `../openAPI/api.yaml`), `utf8`),
);

app.use(`/api-docs`, SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

app.get(`/hello`, (req, res) => {
  res
    .status(200)
    .json({ message: `Hello World with OpenAPI 3.1.1 | API First` });
});

app.listen(port, () => {
  console.log(`Server is running in port ${port} | Production server`);
});
