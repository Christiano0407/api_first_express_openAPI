import express from "express"; 
const router = express.Router(); 

// = endpoint: /api/v1/hello = 
router.get(`/`, (req, res) => {
  res
    .status(200)
    .json({ message: `Hello World with OpenAPI 3.1.1 | API First` });
});

// = endpoint: /api/v1/hello/:name =
router.get(`/:name`, (req, res) => {
  const {name} = req.params; 
  res
    .status(200)
    .json({message: `Hello ${name}`}); 
}); 

export default router; 