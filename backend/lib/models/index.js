const { readdirSync, statSync } = require("fs");
const { join } = require("path");

const PATH_TO_SCHEMAS = join(__dirname, "schemas");

module.exports = function registerModels(mongoConnection) {
  require("./schemas/v2/post");
  readdirSync(PATH_TO_SCHEMAS).forEach((fileName) => {
    const filePath = join(PATH_TO_SCHEMAS, fileName);

    if (statSync(filePath).isDirectory()) return;

    const schema = require(filePath); // eslint-disable-line import/no-dynamic-require
    var name = fileName.replace(".js", "");
    const modelName = name.charAt(0).toUpperCase() + name.slice(1);
    mongoConnection.model(modelName, schema);
  });
};
