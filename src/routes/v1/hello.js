const express = require('express');
const router = express.Router();

// GET /v1/hello
router.get('/', (req, res) => {
  res.send('Hello from the hello route!');
});

module.exports = router;
