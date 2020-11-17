const moment = require("moment");
const tlds = require("tlds");
const _isEmail = require("validator/lib/isEmail");

const generateUUID = ({ range }) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  // eslint-disable-next-line no-plusplus
  for (let i = range; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

const dateToEpoch = (date) => Math.round(date.getTime() / 1000);

// eslint-disable-next-line eqeqeq
const bool = (env) => env == "true";

const getCookieToken = (req) => req.cookies.token;

// email validation code from front-end 'src\utils\validators'
const isValidTopLevelDomain = (string) => {
  return tlds.some(tld => string.endsWith("." + tld));
};

const isValidEmail = (email) => {
  return _isEmail(email) && isValidTopLevelDomain(email);
};

// password validation code from front-end 'src\utils\validators'
const SPECIAL_CHARS = /[!@#$%^&*.;]/;
const containsLowerCase = (str) => /[a-z]/.test(str);
const containsUpperCase = (str) => /[A-Z]/.test(str);
const containsNumber = (str) => /\d/.test(str);
const containsSpecialChars = (str) => SPECIAL_CHARS.test(str);

const isValidPassword = (password) => {
  const passwordChecks = [
    containsLowerCase(password),
    containsUpperCase(password),
    containsNumber(password),
    containsSpecialChars(password),
  ];

  return passwordChecks.filter(isValid => isValid).length >= 3;
};

const relativeTimeObject = (number, unit) => ({
  count: number,
  unit: unit,
});

const translateISOtoRelativeTime = (ISODate) => {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: (number) => relativeTimeObject(number, "second"),
      ss: (number) => relativeTimeObject(number, "second"),
      m: (number) => relativeTimeObject(number, "minute"),
      mm: (number) => relativeTimeObject(number, "minute"),
      h: (number) => relativeTimeObject(number, "hour"),
      hh: (number) => relativeTimeObject(number, "hour"),
      d: (number) => relativeTimeObject(number, "day"),
      dd: (number) => relativeTimeObject(number, "day"),
      w: (number) => relativeTimeObject(number, "week"),
      ww: (number) => relativeTimeObject(number, "week"),
      M: (number) => relativeTimeObject(number, "month"),
      MM: (number) => relativeTimeObject(number, "month"),
      y: (number) => relativeTimeObject(number, "year"),
      yy: (number) => relativeTimeObject(number, "year"),
    },
  });

  return moment(ISODate).fromNow(true);
};

const setElapsedTimeText = (createdAt, updatedAt) => {
  return {
    created: translateISOtoRelativeTime(createdAt),
    isEdited: createdAt < updatedAt,
  };
};

const getReqParam = (req, paramName) => {
  // check in body props OR path params OR query params (might be null)
  const body = req.body || {}; // might be null
  const params = req.params || {};
  const query = req.query || {};

  return body[paramName] || params[paramName] || query[paramName];
};

const createSearchRegex = (keywords) => {
  let cleanKeywords = keywords.replace(/[.*+?^${}()|[\]\\\.]/g, "\\$&");
  let isLatin = /^[a-zA-Z .*+?^${}()|[\]\\\.]+$/.test(cleanKeywords);
  const keywordsRegex = new RegExp(
    cleanKeywords
      .split(/[ \/,=$%#()-]/gi)
      .filter((key) => key && key.length > 1)
      .map((key) =>
        isLatin && key.length <= 3
          ? "\\b" + key + "\\b"
          : isLatin
          ? "\\b" + key
          : key,
      )
      .join("|") || "\\b\\B",
    "ig",
  );
  return keywordsRegex;
}

module.exports = {
  bool,
  dateToEpoch,
  generateUUID,
  getCookieToken,
  getReqParam,
  isValidEmail,
  isValidPassword,
  createSearchRegex,
  setElapsedTimeText,
};
