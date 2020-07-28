import axios from 'axios';

const urls = {
  LOGIN: '/api/users/login',
  SIGN_UP: '/api/users/signup',
  USERS: '/api/users',
};

export const Auth = {
  signUp(body) {
    return axios.post(urls.SIGN_UP, body);
  },

  login(body) {
    return axios.post(urls.LOGIN, body);
  },
};

export const User = {
  getAllUsers() {
    return axios.get(urls.USERS);
  },
};
