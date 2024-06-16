const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/envConfig');
const StatusCodes = require('../utils/statusCodes');

const authMiddleware = (req, res, next) => {
    // Retrieve token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
