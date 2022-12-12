const { DataTypes } = require("sequelize");
const { get } = require("lodash");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const users = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      private: true,
    },
    user_rights: {
      type: DataTypes.STRING,
      defaultValue: "admin",
    },
    gender: {
      type: DataTypes.STRING,
      defaultValue: "male",
    },
  },
  {
    underscored: true,
    hooks: {
      beforeCreate: async ({ dataValues }) => {
        dataValues.password = await bcrypt.hash(get(dataValues, "password"), 8);
      },
    },
  }
);

users.isPasswordMatch = async (reqPassword, retrivePassword) => {
  return await bcrypt.compare(reqPassword, retrivePassword);
};

users.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

module.exports = users;
