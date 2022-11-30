const sequelize = require("./config/database");
const app = require("./app");

const logger = require("./config/logger");

let server;
sequelize
  //.sync({force : true})
  .sync()
  .then(() => {
    server = app.listen(process.env.PORT);
    //pending set timezone
    console.log(`App listening on port http://localhost:${process.env.PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
