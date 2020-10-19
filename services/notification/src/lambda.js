const { config } = require("./config");
const { errorNotifier } = require("./helpers/error-notifier");
const { NotificationService } = require("./service");
const { log } = require("./helpers/logger");

let cachedDb = null;

function setCachedDb(db) {
  if (cachedDb === null) {
    cachedDb = db;
  }
}

exports.handler = async (event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = false;
    const frequency = event.frequency;
    const service = new NotificationService(config);
    await service.initializeDb(cachedDb);
    setCachedDb(service.dbHelper.db);
    await service.process(frequency);
    return {
      body: JSON.stringify("Success"),
      statusCode: 200,
    };
  } catch (error) {
    log.error(error, "Internal Server Error");
    await errorNotifier.capture(error);
    return {
      body: JSON.stringify("An error occurred."),
      statusCode: 500,
    };
  }
};
