const jwt = require("jsonwebtoken");
const { get, split, isEmpty } = require("lodash");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");

const verifyAuth = () => async (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    try {
      const extractToken = split(get(req, "headers.authorization"), " ")[1];

      jwt.verify(extractToken, get(config, "jwt.secret"));
      resolve();
    } catch (error) {
      reject(error);
    }
  })
    .then((e) => {
      next();
    })
    .catch((err) => next(new ApiError(httpStatus.UNAUTHORIZED, err)));
};

const createAuth = async (user) => {
  return await jwt.sign(user, get(config, "jwt.secret"));
};

module.exports = {
  verifyAuth,
  createAuth,
};
