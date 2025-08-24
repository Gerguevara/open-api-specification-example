const express = require('express');
const router = express.Router();

// GET /v2/hello
router.get('/', (req, res) => {
  res.send('Hello from v2 ' + new Date().toISOString());
});

module.exports = router;
