const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.BACKEND_SERVICE_URL || "http://localhost:8000",
      changeOrigin: true,
    }),
  );
};
