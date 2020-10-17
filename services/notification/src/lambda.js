// TODO remove/replace with actual code
const tempFunction = async (event, context) => {
  /* eslint-disable no-console */
  console.log(event);
  /* eslint-disable no-console */
  console.log(context);
};

exports.handler = async (event, context) => {
  try {
    // TODO replace this with actual function to call
    await tempFunction(event, context);
    return {
      body: JSON.stringify("Hello world!"),
      statusCode: 200,
    };
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error); // TODO remove or replace with logger
    return {
      body: JSON.stringify("Goodbye world :("),
      statusCode: 500,
    };
  }
};
