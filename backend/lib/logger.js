const papertrail = require('pino-papertrail');

function logStream(config) {
  const options = {
    appname: config.appname,
    host: config.host,
    port: config.port,
  };
  const writeStream = papertrail.createWriteStream(options);
  return writeStream;
}

module.exports = logStream;
