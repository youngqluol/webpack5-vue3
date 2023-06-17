const isDevEnv = process.env.NODE_ENV === 'development';
const isProdEnv = process.env.NODE_ENV === 'production';

module.exports = {
  isDevEnv,
  isProdEnv,
};
