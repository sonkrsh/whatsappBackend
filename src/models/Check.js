const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Checck = sequelize.define("checck", {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    defaultValue: "test@gmail.com",
  },
  gender: {
    type: DataTypes.STRING,
    defaultValue: "male",
  },
});

module.exports = Checck;
