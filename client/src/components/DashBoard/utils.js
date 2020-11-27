import qs from "query-string";
import { translateISOTimeTitle } from "assets/data/formToPostMappings";
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

export const getOptionText = (filterOptions, filterLabel, option) =>
  filterOptions
    .filter(({ label }) => label === filterLabel)[0]
    .options.filter(({ value }) => value === option)[0].text;

export const highlightSearchRegex = (text) => {
  let cleanKeywords = text
    .replace(/[.*+?^${}()|[\]\\\.]/g, "\\$&")
    .replace(/\\./g, " ");
  let isLatin = /^[a-zA-Z .*+?^${}()|[\]\\\.]+$/.test(cleanKeywords);
  const regex = new RegExp(
    `(${
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
        .join("|") || "\\b\\B"
    })`,
    "ig",
  );
  return regex;
};

export const setQueryKeysValue = (history, newQuery) => {
  const query = qs.parse(history.location.search);
  for (const key in newQuery) {
    if (!newQuery[key] || newQuery[key] === -1) delete query[key];
    else query[key] = newQuery[key];
  }
  const stringifiedQuery = qs.stringify(query);
  const oldQuery = history.location.search.replace("?", "");
  if (stringifiedQuery === oldQuery) return;
  history.push({
    pathname: history.location.pathname,
    search: stringifiedQuery,
  });
};

export const getPostedTime = (post) => {
  const today = new Date();
  const postCreatedAt = new Date(post.createdAt);
  const splitDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    return {
      year,
      month,
      day,
      hour,
    };
  };
  console.log(postCreatedAt);
  if (splitDate(today).year > splitDate(postCreatedAt).year)
    return `${
      splitDate(today).year - splitDate(postCreatedAt).year
    } year(s) ago`;
  if (splitDate(today).month > splitDate(postCreatedAt).month)
    return `${
      splitDate(today).month - splitDate(postCreatedAt).month
    } month(s) ago`;
  if (splitDate(today).day > splitDate(postCreatedAt).day)
    return `${splitDate(today).day - splitDate(postCreatedAt).day} day(s) ago`;
  if (splitDate(today).hour > splitDate(postCreatedAt).hour)
    return `${
      splitDate(today).hour - splitDate(postCreatedAt).hour
    } hour(s) ago`;
};
