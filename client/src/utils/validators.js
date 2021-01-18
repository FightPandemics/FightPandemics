import React from 'react';
import tlds from "tlds";
import _isEmail from "validator/lib/isEmail";
import wildcards from "disposable-email-domains";

const wildcardsSet = new Set(wildcards);

const validateTopLevelDomain = (string) => {
  for (const tld of tlds) {
    if (string.endsWith("." + tld)) {
      return true;
    }
  }
  return false;
};

const validateDisposableEmail = (email) => {
  const emailDomain = email.split("@")[1];
  return wildcardsSet.has(emailDomain);
};

export const validateEmail = (email) => {
  let errorMessage = "";
  if (!email) {
    errorMessage = "emailRequired";
  } else if (
    !_isEmail(email) ||
    !validateTopLevelDomain(email) ||
    validateDisposableEmail(email)
  ) {
    errorMessage = "emailInvalid";
  }
  if (errorMessage.length != 0) {
    return errorMessage;
  } else {
    return true;
  }
};

const SPECIAL_CHARS = / |!|"|#|\$|%|&|'|\(|\)|\*|\+|,|-|\.|\/|:|;|<|=|>|\?|@|\[|\\|\]|\^|_|`|{|\||}|~/;
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

const URL = /^(?:(?:https?):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;

export const validateURL = (string) => {
  return URL.test(string) && validateTopLevelDomain(string);
};

export const linkify = (text) => {
    let urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    function urlify(text) {
      if (urlRegex.test(text))
        return (
          <a
            target="_blank"
            key={Math.random().toString(36)}
            href={`${text.startsWith("http") ? "" : "//"}${text}`}
          >
            {text}
          </a>
        );
      else return text;
    }
    let output = [];
    text.split(/(\s+)/).forEach((word) => {
      output.push(urlify(word));
    });
    return output;
  };
