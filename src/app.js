const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const { userController } = require("./controllers");
const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

app.post("/create-user", userController);

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next("Not found");
});
// // convert error to ApiError, if needed
// app.use(errorConverter);

// // handle error
// app.use(errorHandler);

module.exports = app;
