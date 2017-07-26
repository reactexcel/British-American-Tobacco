import axios from 'axios';
import { CONFIG } from './config/index';
import { Router, browserHistory } from 'react-router';

axios.interceptors.response.use(response =>
  response, (error) => {
    if (error.response && error.response.status === 403 || error.response.status === 400) {
      localStorage.removeItem('bat-access-token');
      browserHistory.push('/');
    }
    return Promise.reject(error);
});

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('bat-access-token');
  config.url = CONFIG.url + config.url;
  if (accessToken) {
    config.url = `${config.url}?accessToken=${accessToken}`;
  }
    // Do something before request is sent
  return config;
}, error =>
    // Do something with request error
   Promise.reject(error));
