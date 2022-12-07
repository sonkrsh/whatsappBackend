const successHandle = (res, code, data) => {
  res.status(code).send({
    message: "success",
    data: data,
  });
};

module.exports = successHandle;
