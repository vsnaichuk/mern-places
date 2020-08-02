export const apiUrl = {
  LOGIN: '/api/users/login',
  SIGN_UP: '/api/users/signup',
  USERS: '/api/users',
  PLACES: '/api/places',
  USER_PLACES: '/api/places/user',
};

export const apiConfig = {
  auth(isLoginMode) {
    return [
      {
        url: isLoginMode ? apiUrl.LOGIN : apiUrl.SIGN_UP,
        method: 'POST',
      },
      { manual: true },
    ];
  },

  newPlace() {
    return [
      {
        url: apiUrl.PLACES,
        method: 'POST',
      },
      { manual: true },
    ];
  },

  getPlaceById(id) {
    return `${apiUrl.PLACES}/${id}`;
  },

  getPlacesById(id) {
    return `${apiUrl.USER_PLACES}/${id}`;
  },

  deletePlace(id) {
    return [
      {
        url: `${apiUrl.PLACES}/${id}`,
        method: 'DELETE',
      },
      { manual: true },
    ];
  },

  updatePlace(id) {
    return [
      {
        url: `${apiUrl.PLACES}/${id}`,
        method: 'PATCH',
      },
      { manual: true },
    ];
  },
};
