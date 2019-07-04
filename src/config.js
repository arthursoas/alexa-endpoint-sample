const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  ip: process.env.IP || '0.0.0.0',
};

module.exports = config;
export default module.exports;
