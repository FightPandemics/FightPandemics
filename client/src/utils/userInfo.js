export const getInitials = (firstName, lastName) => {
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};
export const getInitialsFromFullName = (fullName) => {
  const [firstName, lastName] = fullName.split(" ");
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};
