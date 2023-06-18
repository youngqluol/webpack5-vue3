const isDevEnv = process.env.NODE_ENV === 'development';
const isProdEnv = process.env.NODE_ENV === 'production';

const proxySettings = {
  // for example
  '/api/': {
    target: 'http://198.168.111.111:3001',
    changeOrigin: true,
  },
  // .....
};

const DEFAULT_PORT = Number.parseInt(process.env.PORT, 10) || 3000; // 端口号

module.exports = {
  isDevEnv,
  isProdEnv,
  proxySettings,
  DEFAULT_PORT,
};
