const express = require("express");
const validate = require("../../../middlewares/validate");
const auth = require("../../../middlewares/auth");
const { authValidation } = require("../../../validations");
const { addUser } = require("../../../controllers");

const router = express.Router();

router.post("/register", validate(authValidation.register), addUser);

module.exports = router;
