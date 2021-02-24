import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

export default (baseURL: string) => {
  const api = Axios.create({ baseURL });

  api.interceptors.response.use((response: AxiosResponse) => {
    if (response.data && /^application\/json/.test(response.headers['content-type'])) {
      response.data = camelizeKeys(response.data);
    }
    return response;
  });
  // Axios middleware to convert all api requests to snake_case
  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const newConfig = { ...config };
    if (newConfig.headers['Content-Type'] === 'multipart/form-data') {
      return newConfig;
    }
    if (config.params) { newConfig.params = decamelizeKeys(config.params); }
    if (config.data) { newConfig.data = decamelizeKeys(config.data); }
    return newConfig;
  });

  return api;
};
