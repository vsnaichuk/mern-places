export const LocalStorage = {
  storeLocale(itemName, item) {
    try {
      window.localStorage.setItem(itemName, JSON.stringify(item));
    } catch (err) {
      console.log(err);
    }
  },

  getLocale(itemName) {
    try {
      return JSON.parse(window.localStorage.getItem(itemName));
    } catch (err) {
      console.log(err);
    }
  },

  removeLocale(itemName) {
    try {
      window.localStorage.removeItem(itemName);
    } catch (err) {
      console.log(err);
    }
  },
};
