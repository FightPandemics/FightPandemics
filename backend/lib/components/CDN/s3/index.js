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
  awsConfig.secretAccessKey = cdn.awsSecretAccessKey;
  s3Config.endpoint = cdn.awsEndpoint;
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

async function listByPrefix(Bucket, Prefix) {
  const listParams = {
    Bucket,
    Prefix,
  };
  return s3.listObjects(listParams).promise();
}

async function deleteObjects(Bucket, keys) {
  const deleteParams = {
    Bucket,
    Delete: {
      Objects: keys.map((Key) => {
        Key;
      }),
    },
  };
  return s3.deleteObjects(deleteParams).promise();
}

module.exports = {
  upload,
  listByPrefix,
  deleteObjects,
};
