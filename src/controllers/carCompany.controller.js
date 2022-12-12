const { carCompanyModel } = require("../models");
const httpStatus = require("http-status");
const { get, isEmpty } = require("lodash");
const { createAuth } = require("../middlewares/auth");
const generateImageName = require("../utils/generateImageName");
const successHandle = require("../middlewares/successHandle");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");
const uploadImage = require("../utils/uploadImage");

const createCarCompany = async (req, res, next) => {
  try {
    const dataInSequence = await generateImageName(req);

    await uploadImage(req, dataInSequence.imgShortId);
    const resData = await carCompanyModel.create(dataInSequence.combineData);

    successHandle(res, httpStatus.CREATED, resData.toJSON(resData));
  } catch (err) {
    return next(new ApiError(httpStatus.BAD_REQUEST, err));
  }
};

module.exports = { createCarCompany };
