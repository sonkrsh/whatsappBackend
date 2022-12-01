const Sequelize = require("sequelize");

const { mysql } = require("./config");

const DB_DATABASE = mysql.db_name;
const DB_USERNAME = mysql.db_userName;
const DB_PASSWORD = mysql.db_password;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: mysql.db_dialect,
  host: mysql.db_host,
});

module.exports = sequelize;
