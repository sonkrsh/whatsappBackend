const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const carCompany = sequelize.define("carCompany", {
  carCompany_uuid: {
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
});

module.exports = carCompany;
