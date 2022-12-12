const express = require("express");
const validate = require("../../../middlewares/validate");
const { verifyAuth } = require("../../../middlewares/auth");
const upload = require("../../../utils/multer");
const { carCompanyValidation } = require("../../../validations");
const { carCompanyController } = require("../../../controllers");

const router = express.Router();

router.post(
  "/carCompany",
  verifyAuth(),
  upload.single("image"),
  validate(carCompanyValidation.createCarCompany),
  carCompanyController.createCarCompany
);

module.exports = router;
