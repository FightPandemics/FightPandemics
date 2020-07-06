const INDIVIDUAL_AUTHOR_TYPE = "Individual";

export const authorProfileLink = (post) =>
  `/${
    post.author.type === INDIVIDUAL_AUTHOR_TYPE ? "profile" : "organization"
  }/${post.author.id}`;
