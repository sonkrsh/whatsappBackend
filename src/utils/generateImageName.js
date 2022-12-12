const shortid = require("shortid");
const config = require("../config/config");

const generateImageName = async (data) => {
  let imgShortId = null;
  let combineData = null;
  if (data.file) {
    imgShortId = await `${shortid.generate()}-${data.file.originalname}`;
    combineData = {
      name: data.body.name,
      image: `${config.image.image_url}/${imgShortId}`,
    };
  }

  return {
    imgShortId,
    combineData,
  };
};

module.exports = generateImageName;
