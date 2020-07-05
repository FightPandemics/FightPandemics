export const getInitialsFromFullName = (fullName) => {
  return fullName
    .split(" ")
    .map((n) => n[0].toUpperCase())
    .join("")
    .substring(0, 2);
};
