const { readdirSync } = require("fs");
const { join } = require("path");

const PATH_TO_SCHEMAS = join(__dirname, "./schemas");

module.exports = function registerModels(mongoConnection) {
  readdirSync(PATH_TO_SCHEMAS).forEach((fileName) => {
    const filePath = join(PATH_TO_SCHEMAS, fileName);
    const schema = import(filePath);
    const modelName = fileName.replace(".js", "");
    mongoConnection.model(modelName, schema);
  });
};
