const express = require('express');
const helloRoutes = require('./hello');

const router = express.Router();

// Mount routes
router.use('/hello', helloRoutes);

module.exports = router;
