const Sequelize = require("sequelize");

const { mysql } = require("./config");

const DB_DATABASE = mysql.database;
const DB_USERNAME = mysql.username;
const DB_PASSWORD = mysql.password;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: mysql.dialect,
  host: mysql.host,
  logging: false,
});

module.exports = sequelize;
