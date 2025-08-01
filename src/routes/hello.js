import express from "express";
const router = express.Router();

// = endpoint: /api/v1/hello =
router.get(`/`, (req, res) => {
  try {
    res
      .status(200)
      .json({ 
        message: `Hello World with OpenAPI 3.1.1 | API First`,
        version: `1.1.0` 
      });
  }catch(err) {
    res.status(500).json({
      message: `We have Server Error`,
      error: err.message
    });
  }
});

export default router;
