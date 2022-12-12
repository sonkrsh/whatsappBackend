const sequelize = require("./config/database");
const app = require("./app");
const env = require("dotenv");

const logger = require("./config/logger");

env.config();

let server;
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    server = app.listen(process.env.PORT);
    logger.info("Connected to MYSQL");
    logger.info(`App listening on port http://localhost:${process.env.PORT}`);
  })
  .catch((err) => {
    logger.info("Database connection error", err);
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

// ctrl+c
process.on("SIGINT", async () => {
  logger.info("SIGINT received");
  if (server) {
    await sequelize.close();
    await server.close();
  }
});

// kill process id
process.on("SIGTERM", async () => {
  logger.info("SIGTERM received");
  if (server) {
    await sequelize.close();
    await server.close();
  }
});
