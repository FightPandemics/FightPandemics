const path = require("path");
const pkg = require("../../package.json");
const doc = require(path.resolve(__dirname, "../../version.json"));

const versionDetails = {
  commit: doc.version,
  serviceName: pkg.name,
  version: pkg.version,
};

module.exports = () => (req, res) => res.json(versionDetails);
