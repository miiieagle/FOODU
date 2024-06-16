const express = require('express');
const { getMenu, postMenu } = require('../controllers/menuController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Route to get all menu items
router.get('/', getMenu);

// Route to post a new menu item (protected route, admin only)
router.post('/', authMiddleware, adminMiddleware, postMenu);

module.exports = router;
