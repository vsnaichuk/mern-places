import axios from 'axios';

const urls = {
  LOGIN: '/api/users/login',
  SIGN_UP: '/api/users/signup',
};

export const Auth = {
  signUp(body) {
    return axios.post(urls.SIGN_UP, body);
  },

  login(body) {
    return axios.post(urls.LOGIN, body);
  },
};
