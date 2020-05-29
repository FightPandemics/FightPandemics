import axios from "axios";

const KEY_TOKEN = "authToken";
const EMAIL_VERIFIED = "emailVerified";

export const setAuthToken = ({ token, emailVerified }) => {
  if (!token) return localStorage.removeItem(KEY_TOKEN);

  // localStorage.setItem(KEY_TOKEN, token);
  // localStorage.setItem(EMAIL_VERIFIED, emailVerified);

  if (token) {
    axios.defaults.headers.common["Authorization"] = token; // Apply to every request
  } else {
    delete axios.defaults.headers.common["Authorization"]; // delete auth header
  }
};

export const getAuthToken = () => {
  const token = localStorage.getItem(KEY_TOKEN);
  const emailVerified = localStorage.getItem(EMAIL_VERIFIED);

  return { token, emailVerified };
};
