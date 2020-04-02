module.exports = (error, req, res, next) => {
  if (error.status || res.status >= 500) {
    res.send({
      status: res.status,
      message: error.message || "Internal Server Error",
    });
  }
};
