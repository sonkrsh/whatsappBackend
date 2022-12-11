const { usersModel } = require("../models");
const httpStatus = require("http-status");
const { get, isEmpty } = require("lodash");
const { createAuth } = require("../middlewares/auth");
const successHandle = require("../middlewares/successHandle");
const ApiError = require("../utils/ApiError");

const addUser = async (req, res, next) => {
  try {
    const resData = await usersModel.create(req.body);
    successHandle(res, httpStatus.CREATED, resData.toJSON(resData));
  } catch (err) {
    return next(new ApiError(httpStatus.BAD_REQUEST, err));
  }
};

const loginsUser = async (req, res, next) => {
  try {
    const query = await usersModel.findOne({
      where: { email: get(req, "body.email") },
    });
    if (!isEmpty(query)) {
      const retriveQuery = query.get();

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
      return successHandle(res, httpStatus.FOUND, {
        data: query.toJSON(retriveQuery),
        token: createToken,
      });
    }
    return next(new ApiError(httpStatus.NOT_FOUND, "user not Found"));
  } catch (err) {
    return next(new ApiError(httpStatus.BAD_REQUEST, err));
  }
};

const allUsers = async (req, res, next) => {
  const allUsers = await usersModel.findAll({});
  successHandle(res, httpStatus.FOUND, allUsers);
};

module.exports = { addUser, loginsUser, allUsers };
