const moment = require("moment");

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

const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const isValidEmail = (email) => emailRegEx.test(email);

const translateISOtoRelativeTime = (ISODate) => {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: (number) => number + " second ago",
      ss: "%d seconds ago",
      m: "1 minute ago",
      mm: "%d minutes ago",
      h: "1 hour ago",
      hh: "%d hours ago",
      d: "1 day ago",
      dd: "%d days ago",
      M: "a month ago",
      MM: "%d months ago",
      y: "a year ago",
      yy: "%d years ago",
    },
  });

  const secondsElapsed = moment().diff(ISODate, "seconds");
  const dayStart = moment().startOf("day").seconds(secondsElapsed);

  if (secondsElapsed > 300) {
    return moment(ISODate).fromNow(true);
  } else if (secondsElapsed < 60) {
    return dayStart.format("s ") + "seconds ago";
  } else {
    const minute = dayStart.format("m ");
    const minuteString = minute > 1 ? " minutes ago" : " minute ago";
    return minute.concat(minuteString);
  }
};

const setElapsedTimeText = (createdAt, updatedAt) => {
  if (createdAt < updatedAt) {
    return `${translateISOtoRelativeTime(
      createdAt,
    )} · edited  ${translateISOtoRelativeTime(updatedAt)}`;
  } else {
    return translateISOtoRelativeTime(createdAt);
  }
};

module.exports = {
  bool,
  dateToEpoch,
  generateUUID,
  getCookieToken,
  isValidEmail,
  setElapsedTimeText,
};
