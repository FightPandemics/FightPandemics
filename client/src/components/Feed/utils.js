import qs from "query-string";
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

export const setQueryKeyValue = (history, method, key, value) => {
  let query = qs.parse(history.location.search);
  if (!value || value === -1) delete query[key];
  else query[key] = value;
  history[method]({
    pathname: history.location.pathname,
    search: qs.stringify(query),
  });
};
