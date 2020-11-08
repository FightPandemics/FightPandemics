// Used for testing Lambda locally

const { handler } = require("./lambda");

const frequency = process.env.FREQUENCY || "instant";
const validFrequencies = new Set([
  "instant",
  "daily",
  "weekly",
  "biweekly",
]);

if (!validFrequencies.has(frequency)) {
  console.log(`Invalid frequency ${frequency}. Must be one of ${[...validFrequencies].join(', ')}`);
  process.exit(1);
}
// Add test event payload here
const event = {
  frequency,
};
const context = {
  callbackWaitsForEmptyEventLoop: false,
};

handler(event, context).then((response) => {
  /* eslint-disable no-console */
  console.log(response);
  process.exit();
});
