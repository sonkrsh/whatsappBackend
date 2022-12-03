const { users } = require("../models");

const addUser = async (req, res) => {
  const resData = await users.create(req.body);
  res.status(200).json({
    message: "success",
    data: resData,
  });
};

module.exports = { addUser };
