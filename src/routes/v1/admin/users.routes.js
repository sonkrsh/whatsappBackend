const express = require("express");
const validate = require("../../../middlewares/validate");
const { verifyAuth } = require("../../../middlewares/auth");
const { usersValidation } = require("../../../validations");
const { userController } = require("../../../controllers");

const router = express.Router();

router.post(
  "/register",
  validate(usersValidation.register),
  userController.addUser
);
router.post(
  "/login",
  validate(usersValidation.login),
  userController.loginsUser
);
router.get("/all-users", userController.allUsers);

module.exports = router;
