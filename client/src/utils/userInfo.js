// export const getInitials = (firstName, lastName) => {
//   return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
// };
export const getInitialsFromFullName = (fullName) => {
  const [firstName, lastName] = fullName.split(" ");
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};
export const getInitials = (str) => {
  let initials = str.replace(/[^A-Z]/g, "").substring(0, 2);
  if (initials.length < 2) initials += str.substring(1, 2).toUpperCase();
  return initials;
};
