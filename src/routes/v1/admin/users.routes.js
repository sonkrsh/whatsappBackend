const express = require("express");
const validate = require("../../../middlewares/validate");
const { verifyAuth } = require("../../../middlewares/auth");
const { authValidation } = require("../../../validations");
const { userController } = require("../../../controllers");

const router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  userController.addUser
);
router.post(
  "/login",
  validate(authValidation.login),
  userController.loginsUser
);

module.exports = router;
