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
  return tlds.some((tld) => string.endsWith("." + tld));
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

  return passwordChecks.filter((isValid) => isValid).length >= 3;
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
};

const getUserById = async function (app, userId, options = null) {
  const User = app.mongo.model("IndividualUser");
  const [userErr, user] = await app.to(
    User.findById(userId).populate("organisations"),
  );

  if (userErr) {
    req.log.error(userErr, "Failed retrieving user");
    throw app.httpErrors.internalServerError();
  } else if (user === null) {
    if (options) {
      options.user = user;
      return options;
    }
    req.log.error(userErr, "User does not exist");
    throw app.httpErrors.notFound();
  }

  if (!options) options = {};
  options.user = user;
  return options;
}

const getSocketIdByUserId = (app, userId) => {
  return new Promise((resolve) => {
    app.io.of("/").adapter.clients([userId], (err, clients) => {
      if (err || !clients || !clients.length) return resolve(null);
      else resolve(clients[0]); // return the entire array, if you want all active devices.
    });
  });
};

const isUserInRoom = (app, threadId, socketId) => {
  return new Promise((resolve) => {
    app.io.of("/").adapter.clientRooms(socketId, (err, rooms) => {
      if (err) return resolve(false);
      if (!rooms.includes(threadId)) return resolve(false);
      return resolve(true);
    });
  });
};

module.exports = {
  bool,
  dateToEpoch,
  generateUUID,
  getCookieToken,
  getSocketIdByUserId,
  isUserInRoom,
  getReqParam,
  isValidEmail,
  isValidPassword,
  createSearchRegex,
  setElapsedTimeText,
translateISOtoRelativeTime,  
getUserById,
};
