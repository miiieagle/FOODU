const express = require('express');
const authRoutes = require('../routes/authRoutes');
const menuRoutes = require('../routes/menuRoutes');
const orderRoutes = require('../routes/orderRoutes');
const { VERSION } = require('../config/envConfig');

const router = express.Router();

// Root route handler
router.get('/', (req, res) => {
    res.send('Welcome to FoodU!');
});



router.use(`/api/${VERSION}/auth`, authRoutes);
router.use(`/api/${VERSION}/menu`, menuRoutes);
router.use(`/api/${VERSION}/orders`, orderRoutes);

module.exports = router;
