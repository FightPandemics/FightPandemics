const {
  config: { cdn },
} = require("../../../config");
const { upload } = require("./s3");

async function uploadOrgAvatar(id, image) {
  const key = `content/avatars/organisations/${id}.jpg`;
  await upload(cdn.s3Bucket, key, image);
  return `${cdn.baseUrl}/${key}`;
}

async function uploadUserAvatar(id, image) {
  const key = `content/avatars/users/${id}.jpg`;
  await upload(cdn.s3Bucket, key, image);
  return `${cdn.baseUrl}/${key}`;
}

module.exports = {
  uploadOrgAvatar,
  uploadUserAvatar,
};
