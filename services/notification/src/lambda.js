const { config } = require("./config");
const { NotificationService } = require("./service");

let cachedDb = null;

function setCachedDb(db) {
  if (cachedDb === null) {
    cachedDb = db;
  }
}

exports.handler = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    // TODO if processing daily, weekly, bi-weekly digests, may need multiple cron jobs. Probably should pass in
    // frequency into the event payload
    const frequency = event.frequency;
    const service = new NotificationService(config);
    await service.initializeDb(cachedDb);
    setCachedDb(service.dbHelper.db);
    await service.process(frequency);
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
