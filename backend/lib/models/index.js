const { readdirSync, statSync } = require("fs");
const { join, basename } = require("path");

require("./schemas/v2/user");

const PATH_TO_SCHEMAS = join(__dirname, "schemas");

module.exports = function registerModels(mongoConnection) {
  readdirSync(PATH_TO_SCHEMAS).forEach((fileName) => {
    const filePath = join(PATH_TO_SCHEMAS, fileName);

    if (statSync(filePath).isDirectory()) return;

    const schema = require(filePath); // eslint-disable-line import/no-dynamic-require
    const modelName = basename(fileName, ".js");
    mongoConnection.model(modelName, schema);
  });
};
