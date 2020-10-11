const { config } = require("./config");
const { NotificationService } = require("./service");

exports.handler = async (event, context) => {
  try {
    // TODO if processing daily, weekly, bi-weekly digests, may need multiple cron jobs. Probably should pass in
    // frequency into the event payload
    // const event = event.frequency;
    // const service = new NotificationService(config);
    // await service.process(frequency);
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
