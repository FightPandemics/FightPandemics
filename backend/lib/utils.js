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

const getBearerToken = (req) =>
  req.headers.authorization.replace("Bearer ", "");

const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const isValidEmail = (email) => emailRegEx.test(email);

module.exports = {
  bool,
  dateToEpoch,
  generateUUID,
  getBearerToken,
  isValidEmail,
};
