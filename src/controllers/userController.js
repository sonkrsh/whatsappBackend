const db = require("../models");
const Users = db.User;

const addUser = async (req, res) => {
  const resData = await Users.create(req.body);
  res.status(200).json({
    message: "success",
    data: resData,
  });
};

module.exports = addUser;
