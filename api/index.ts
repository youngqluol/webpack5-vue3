import { get } from './axios';

// example
export function getCommonInfo() {
  return get({
    url: 'get/commonInfo',
    params: {
      token: '1111',
    },
  });
}
