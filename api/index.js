import { get } from './axios';

// 示例
export function getCommonInfo() {
  return get({
    url: 'get/commonInfo',
    params: {
      token: '1111',
    },
  });
}
