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

export const buildTimestampString = () => {
  
}
