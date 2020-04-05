const created = (user) => ({
  statusCode: 201,
  error: "User created successfully!",
  user,
});

const alreadyExist = () => ({
  statusCode: 409,
  error: "User already exist!",
});

module.exports = {
  created,
  alreadyExist,
};
