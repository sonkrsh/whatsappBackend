const sharp = require("sharp");
const path = require("path");
const _ = require("lodash");
const config = require("../config/config");

const iconUpload = (data, imgShortId) => {
  sharp(data.file.buffer)
    .resize(_.toNumber(config.image.image_resize))
    .jpeg({ quality: _.toNumber(config.image.image_quality) })
    .toFile(path.join(path.dirname(__dirname), `./uploads/${imgShortId}`));
};

module.exports = iconUpload;
