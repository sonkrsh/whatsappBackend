const Sequelize = require("sequelize");
const env = require("dotenv");
env.config();

const DB_DATABASE = "Learn_MERN";
const DB_USERNAME = "root";
const DB_PASSWORD = "";

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
