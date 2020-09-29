const {
  config: { cdn },
} = require("../../../config");
const path = require("path");
const { upload } = require("./s3");

async function uploadOrgAvatar(id, file) {
  return _uploadAvatar("organisations", id, file);
}

async function uploadUserAvatar(id, file) {
  return _uploadAvatar("users", id, file);
}

async function _uploadAvatar(userType, id, file) {
  const extension = path.extname(file.name);
  const timestamp = new Date().getTime();
  const key = `content/avatars/${userType}/${id}-${timestamp}${extension}`;
  await upload(cdn.s3Bucket, key, file.data);
  return `${cdn.baseUrl}/${key}`;
}

module.exports = {
  uploadOrgAvatar,
  uploadUserAvatar,
};
