const { usersModel } = require("../models");
const httpStatus = require("http-status");
const { get, isEmpty } = require("lodash");
const { createAuth } = require("../middlewares/auth");
const ApiError = require("../utils/ApiError");

const addUser = async (req, res, next) => {
  try {
    const resData = await usersModel.create(req.body);

    res.status(httpStatus.CREATED).send({
      message: "success",
      data: resData.toJSON(resData),
    });
  } catch (err) {
    return next(new ApiError(httpStatus.BAD_REQUEST, err));
  }
};

const loginsUser = async (req, res, next) => {
  try {
    const query = await usersModel.findOne({
      where: { email: get(req, "body.email") },
    });

    const retriveQuery = query?.get();

    if (
      isEmpty(retriveQuery) ||
      !(await usersModel.isPasswordMatch(
        get(req, "body.password"),
        get(retriveQuery, "password")
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

    const createToken = await createAuth(retriveQuery);
    res.status(httpStatus.FOUND).send({
      message: "success",
      data: { data: query.toJSON(retriveQuery), token: createToken },
    });
  } catch (err) {
    return next(new ApiError(httpStatus.BAD_REQUEST, err));
  }
};

module.exports = { addUser, loginsUser };
