const {
  config: { cdn },
} = require("../../../config");
const path = require("path");
const { upload } = require("./s3");

async function uploadOrgAvatar(id, file) {
  const extension = path.extname(file.name);
  const key = `content/avatars/organisations/${id}${extension}`;
  await upload(cdn.s3Bucket, key, file.data);
  return `${cdn.baseUrl}/${key}`;
}

async function uploadUserAvatar(id, file) {
  const extension = path.extname(file.name);
  const key = `content/avatars/users/${id}${extension}`;
  await upload(cdn.s3Bucket, key, file.data);
  return `${cdn.baseUrl}/${key}`;
}

module.exports = {
  uploadOrgAvatar,
  uploadUserAvatar,
};
