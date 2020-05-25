import axios from "axios";

const KEY_TOKEN = "authToken";

export const setAuthToken = (token) => {
  if (!token) return localStorage.removeItem(KEY_TOKEN);

  // localStorage.setItem(KEY_TOKEN, token);

  if (token) {
    axios.defaults.headers.common["Authorization"] = token; // Apply to every request
  } else {
    delete axios.defaults.headers.common["Authorization"]; // delete auth header
  }
};

export const getAuthToken = () => {
  const token = localStorage.getItem(KEY_TOKEN);

  return token;
};
