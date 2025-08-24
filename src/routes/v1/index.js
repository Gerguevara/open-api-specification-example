const express = require('express');
const helloRoutes = require('./hello');
const authRoutes = require('./auth');
const usersRoutes = require('./users');
const productsRoutes = require('./products');

const router = express.Router();

// Mount routes
router.use('/hello', helloRoutes);
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);

module.exports = router;
