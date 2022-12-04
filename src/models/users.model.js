const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const users = sequelize.define("users", {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    defaultValue: "test@gmail.com",
  },
  user_rights: {
    type: DataTypes.STRING,
    defaultValue: "admin",
  },
  gender: {
    type: DataTypes.STRING,
    defaultValue: "male",
  },
});

module.exports = users;
