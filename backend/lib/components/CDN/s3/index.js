const {
  config: { cdn, env },
} = require("../../../../config");
const AWS = require("aws-sdk");

const awsConfig = {
  region: cdn.awsRegion,
};

const s3Config = {
  apiVersion: "2006-03-01",
};

if (env === "dev") {
  awsConfig.accessKeyId = cdn.awsAccessKeyId;
  awsConfig.secretAccessKey = cdn.secretAccessKey;
  s3Config.endpoint = cdn.baseUrl;
  s3Config.s3ForcePathStyle = true;
}
AWS.config.update(awsConfig);
const s3 = new AWS.S3(s3Config);

function upload(Bucket, Key, Body) {
  const uploadParams = {
    Bucket,
    Key,
    Body,
  };
  return s3.upload(uploadParams).promise();
}

module.exports = {
  upload,
};
