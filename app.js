const express = require("express");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/handler");
const { PORT } = require("./config/envConfig");
const connectDB = require('./operations/db');
const routes = require('./operations/routes'); 

const app = express();

// Connect to the database
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes); // Use the routes

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Eatry app listening on port:" + PORT);
});
