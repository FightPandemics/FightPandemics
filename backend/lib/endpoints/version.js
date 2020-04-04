const pkg = require("../../package.json");

const doc = require("../../version.json");

const versionDetails = {
  commit: doc.version,
  serviceName: pkg.name,
  version: pkg.version,
};

module.exports = (req, res) => res.json(versionDetails);
