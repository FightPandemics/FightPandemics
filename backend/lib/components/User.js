const created = (user) => ({
  error: "User created successfully!",
  statusCode: 201,
  user,
});

const alreadyExist = () => ({
  error: "User already exist!",
  statusCode: 409,
});

module.exports = {
  alreadyExist,
  created,
};
