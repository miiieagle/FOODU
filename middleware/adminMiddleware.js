const StatusCodes = require('../utils/statusCodes');

// Middleware to check if the user is an admin.
 
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

module.exports = adminMiddleware;
