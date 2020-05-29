import axios from "axios";

const KEY_TOKEN = "authToken";

export const setAuthToken = (token) => {
  // disable local storage until more specific requirements are clear
  // avoid storing token in storage unless user has explicitly asked to stay signed in perhaps
  // but that can still have potential security risks
  // if (!token) return localStorage.removeItem(KEY_TOKEN);
  // localStorage.setItem(KEY_TOKEN, token);

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const getAuthToken = () => {
  const token = localStorage.getItem(KEY_TOKEN);

  return token;
};
