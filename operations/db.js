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
    mongoose.connect(MONGODB_URI)
        .then(() => logger.info(`Database connected successfully...`))
        .catch(err => logger.error(`Database connection error: ${err.message}`));
};
