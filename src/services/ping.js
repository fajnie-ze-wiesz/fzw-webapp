import apiAxios from './index';

export function ping() {
  return apiAxios.get('ping/').then((response) => {
    return response.data.message;
  });
}
