// Used for testing Lambda locally

const { handler } = require("./lambda");

// Add test event payload here
const event = {
  frequency: "instant",
};
const context = {
  callbackWaitsForEmptyEventLoop: false,
};

handler(event, context).then((response) => {
  /* eslint-disable no-console */
  console.log(response);
  process.exit();
});
