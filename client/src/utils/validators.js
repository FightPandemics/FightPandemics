import tlds from "tlds";

const validateTopLevelDomain = (email) => {
  for (const tld of tlds) {
    if (email.endsWith("." + tld)) {
      return true;
    }
  }
  return false;
};

export const validateEmail = (email) => {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailInput = String(email).toLowerCase();
  const isEmailValid = re.test(emailInput);

  return isEmailValid ? validateTopLevelDomain(emailInput) : false;
};

const SPECIAL_CHARS = /[!@#$%^&*]/;
const containsLowerCase = (str) => /[a-z]/.test(str);
const containsUpperCase = (str) => /[A-Z]/.test(str);
const containsNumber = (str) => /\d/.test(str);
const containsSpecialChars = (str) => SPECIAL_CHARS.test(str);

export const validatePassword = (password) => {
  const results = [
    containsLowerCase(password),
    containsUpperCase(password),
    containsNumber(password),
    containsSpecialChars(password),
  ];

  return results.filter((res) => res).length >= 3;
};
