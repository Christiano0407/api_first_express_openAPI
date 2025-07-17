import express from 'express'; 
const app = express();
const port = 3000;

app.get(`/hello`, (req, res) => {
  res
    .status(200)
    .json({ message: `Hello World with OpenAPI 3.1.1 | API First` });
});

app.listen(port, () => {
  console.log(`Server is running in port ${port} | Production server`);
});
