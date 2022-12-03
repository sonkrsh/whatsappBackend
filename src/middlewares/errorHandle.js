const errorHandle = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    code: statusCode,
    message: err.message || "Not Found",
    stack: err.stack,
  });
};

module.exports = errorHandle;
