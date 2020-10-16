// Used for testing Lambda locally

const { handler } = require("./lambda");

// Add test event payload here
const event = {};
const context = {};

const response = handler(event, context);

/* eslint-disable no-console */
console.log(response);
