const { users } = require("../models");
const httpStatus = require("http-status");
const { get, isEmpty, unset } = require("lodash");
const database = require("../config/database");
const { createAuth } = require("../middlewares/auth");
const ApiError = require("../utils/ApiError");
const { QueryTypes } = require("sequelize");

const addUser = async (req, res, next) => {
  try {
    const resData = await users.create(req.body);
    res.status(httpStatus.CREATED).send({
      message: "success",
      data: resData,
    });
  } catch (err) {
    return next(new ApiError(httpStatus.BAD_REQUEST, err));
  }
};

const loginsUser = async (req, res, next) => {
  const querySQL = `SELECT * from users WHERE email='${get(
    req,
    "body.email"
  )}'`;
  try {
    const retriveQuery = await database.query(querySQL, {
      type: QueryTypes.SELECT,
    });

    if (
      isEmpty(retriveQuery) ||
      !(await users.isPasswordMatch(
        get(req, "body.password"),
        get(retriveQuery?.[0], "password")
      ))
    ) {
      return next(
        new ApiError(
          httpStatus.NOT_FOUND,
          isEmpty(retriveQuery)
            ? "Not Found Any Record With This Credentials"
            : "Password Not Match"
        )
      );
    }

    unset(retriveQuery?.[0], "password");
    const createToken = await createAuth(retriveQuery?.[0]);
    res.status(httpStatus.FOUND).send({
      message: "success",
      data: { data: retriveQuery, token: createToken },
    });
  } catch (err) {
    return next(new ApiError(httpStatus.BAD_REQUEST, err));
  }
};

module.exports = { addUser, loginsUser };
