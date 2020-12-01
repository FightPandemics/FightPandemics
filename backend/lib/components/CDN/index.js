const {
  config: { cdn },
} = require("../../../config");
const path = require("path");
const { upload, listByPrefix, deleteObjects } = require("./s3");

async function uploadOrgAvatar(id, file) {
  return _uploadAvatar("organisations", id, file);
}

async function uploadUserAvatar(id, file) {
  return _uploadAvatar("users", id, file);
}

async function deleteOrgAvatars(id) {
  return _deleteAvatars("organisations", id);
}

async function deleteUserAvatars(id) {
  return _deleteAvatars("users", id);
}

async function _uploadAvatar(userType, id, file) {
  const extension = path.extname(file.name);
  const timestamp = new Date().getTime();
  const key = `content/avatars/${userType}/${id}-${timestamp}${extension}`;
  await upload(cdn.s3Bucket, key, file.data);
  return `${cdn.baseUrl}/${key}`;
}

async function _deleteAvatars(userType, id) {
  const prefix = `content/avatars/${userType}/${id}-`;
  const response = await listByPrefix(cdn.s3Bucket, prefix);
  const files = response.Contents;
  const keys = files.map((file) => file.Key);
  return deleteObjects(cdn.s3Bucket, keys);
}

module.exports = {
  uploadOrgAvatar,
  uploadUserAvatar,
  deleteOrgAvatars,
  deleteUserAvatars,
};
