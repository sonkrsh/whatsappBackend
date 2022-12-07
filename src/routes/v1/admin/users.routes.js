const express = require("express");
const validate = require("../../../middlewares/validate");
const { verifyAuth } = require("../../../middlewares/auth");
const { authValidation } = require("../../../validations");
const { addUser, loginsUser } = require("../../../controllers");

const router = express.Router();

router.post("/register", validate(authValidation.register), addUser);
router.post("/login", validate(authValidation.login), loginsUser);

module.exports = router;
