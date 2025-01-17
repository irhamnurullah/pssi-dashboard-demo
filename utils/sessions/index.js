import Cookies from "js-cookie";

const sessions = {
  saveSession: (name, value, expires) => {
    Cookies.set(name, value, { expires });
  },

  getSessionToken: () => {
    return Cookies.get("token");
  },

  getSessionUser: () => {
    return Cookies.get("user");
  },

  clearSession: () => {
    Cookies.remove("token");
  },
};

export default sessions;
