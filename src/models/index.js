const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("Learn_MERN", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: { max: 5, min: 0, idle: 10000 },
});
sequelize
  .authenticate()
  .then(() => console.log("connected"))
  .catch((err) => console.log("errr", err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize
  .sync()
  .then(() => console.log("yes re sync"))
  .catch((err) => console.log("got some err", err));
db.User = require("./user")(sequelize, DataTypes);

module.exports = db;
