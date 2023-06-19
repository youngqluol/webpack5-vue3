import qs from 'qs';

export function checkUrl(config) {
  if (config.url && config.url.slice(0, 1) !== '/') {
    config.url = `/${config.url}`;
  }
  return config;
}

export function checkContentType(config) {
  if (
    config.data
    && Object.keys(config.data).length > 0
    && config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    config.data = qs.stringify(config.data);
  }
  return config;
}
