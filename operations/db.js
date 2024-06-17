const winston = require("winston");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("../config/envConfig");

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'app.log' })
    ]
});

mongoose.set('strictQuery', false);

module.exports = function() {
    mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000 // 10 seconds timeout
    })
    .then(() => logger.info(`Database connected successfully...`))
    .catch(err => {
        logger.error(`Database connection error: ${err.message}`);
        process.exit(1); // Exit process with failure
    });
};
