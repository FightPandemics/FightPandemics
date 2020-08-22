// import moment from "moment";
const INDIVIDUAL_AUTHOR_TYPE = "Individual";

export const authorProfileLink = (post) =>
  `/${
    post.author.type === INDIVIDUAL_AUTHOR_TYPE ? "profile" : "organisation"
  }/${post.author.id}`;

export const buildLocationString = ({ city = "", country }) => {
  const MAX_LENGTH = 26;
  if (city.length >= MAX_LENGTH)
    return `${city.substring(0, MAX_LENGTH - 3)}..., ${country}`;
  return city ? `${city}, ${country}` : country;
};

export const buildTimestampString = (post) => {
  const calculateDaysOfYear = (date, year) =>
    Math.ceil((date - new Date(year, 0, 1)) / 8.64e7);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentDaysOfYear = calculateDaysOfYear(today, currentYear);

  const createdAt = new Date(post.createdAt.split("T")[0]);
  const createdYear = createdAt.getFullYear();
  const createdDaysOfYear = calculateDaysOfYear(createdAt, createdYear);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const createdDate = createdAt.toLocaleDateString("en-us", options);
  const elapsedTimeText = post?.elapsedTimeText ? post.elapsedTimeText : "";

  if (currentYear - createdYear > 1) return createdDate;
  // edge case when post created in the last few days of last year and current date is the beginning of year
  else if (currentYear - createdYear === 1) {
    return 365 - createdDaysOfYear + currentDaysOfYear < 7
      ? elapsedTimeText
      : createdDate;
  } else {
    // post created year === current year
    return currentDaysOfYear - createdDaysOfYear < 7
      ? elapsedTimeText
      : createdDate;
  }
};
