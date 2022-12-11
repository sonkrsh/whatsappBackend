const successHandle = (res, code, data) => {
  return res.status(code).send({
    message: "success",
    data: data,
  });
};

module.exports = successHandle;
