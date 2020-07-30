export const urls = {
  LOGIN: '/api/users/login',
  SIGN_UP: '/api/users/signup',
  USERS: '/api/users',
};

export const config = {
  auth(isLoginMode) {
    return [
      {
        url: isLoginMode ? urls.LOGIN : urls.SIGN_UP,
        method: 'POST',
      },
      { manual: true },
    ];
  },
};
