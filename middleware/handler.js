const StatusCodes = require('../utils/statusCodes');

// Middleware to handle 404 errors

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(StatusCodes.NOT_FOUND);
    next(error);
};

//Middleware to handle all errors
 
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? StatusCodes.INTERNAL_SERVER_ERROR : res.statusCode;
    res.status(statusCode);
    res.json({
        status: 'error',
        statusCode,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};

module.exports = {
    notFound,
    errorHandler
};
