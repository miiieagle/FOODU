const express = require('express');
const { createOrder } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route to create an order
router.post('/', authMiddleware, createOrder);

module.exports = router;
