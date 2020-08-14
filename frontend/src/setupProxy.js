const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = createProxyMiddleware({
  target: process.env.REACT_APP_BACKEND_URL,
  changeOrigin: true,
});

module.exports = (app) => {
  app.use('/api', proxy);
};
