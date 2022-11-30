const { Checck } = require("../models");

const addUser = async (req, res) => {
  const resData = await Checck.create(req.body);
  res.status(200).json({
    message: "success",
    data: resData,
  });
};

module.exports = addUser;
