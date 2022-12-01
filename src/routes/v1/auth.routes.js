const express = require("express");
const validate = require("../../middlewares/validate");
const { authValidation } = require("../../validations");

const router = express.Router();

router.post("/", validate(authValidation.register), (req, resp) => {
  return resp.status(200).json("auth log");
});

module.exports = router;
