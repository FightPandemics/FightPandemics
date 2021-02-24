export const getInitialsFromFullName = (fullName) => {
  return fullName
    .trim()
    .split(/\s+/)
    .map((n) => n[0].toUpperCase())
    .join("")
    .substring(0, 2);
};

export const isAuthorUser = (user, post) => {
  return (
    user?._id === post?.author?.id ||
    (user?.id === post?.author?.id &&
      (user.ownUser === undefined || user.ownUser))
  );
};

export const isAuthorOrg = (organisations, author) => {
  const isValid = organisations?.some(
    (organisation) => organisation.name === author.name,
  );
  return isValid;
};