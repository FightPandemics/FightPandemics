export const getInitialsFromFullName = (fullName) => {
    return fullName
    .trim()
    .split(/\s+/)
    .map((n) => n[0].toUpperCase())
    .join("")
    .substring(0, 2);
};
