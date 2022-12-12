const Joi = require("joi");

const createCarCompany = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.any(),
  }),
};

module.exports = {
  createCarCompany,
};
