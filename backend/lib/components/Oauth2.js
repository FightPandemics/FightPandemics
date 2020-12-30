const { Facebook } = require("./OAuth2/Facebook");
const { Instagram } = require("./OAuth2/Instagram");
const { Linkedin } = require("./OAuth2/Linkedin");
const { Twitter } = require("./OAuth2/Twitter");
const { Github } = require("./OAuth2/Github");
const { SocialMock } = require("./OAuth2/SocialMock");
const {
  config: {
    oauth2: { facebook, github, instagram, linkedin, twitter },
  },
} = require("../../config");

// abstract factory to create oauth2 client
const createOauth2Client = (socialType) => {
  if (socialType === "facebook" && facebook.clientId && facebook.secretKey) {
    return new Facebook(facebook.clientId, facebook.secretKey);
  }
  if (socialType === "instagram" && instagram.clientId && instagram.secretKey) {
    return Instagram;
  }
  if (socialType === "linkedin" && linkedin.clientId && linkedin.secretKey) {
    return new Linkedin(linkedin.clientId, linkedin.secretKey);
  }
  if (socialType === "twitter" && twitter.clientId && twitter.secretKey) {
    return new Twitter(twitter.clientId, twitter.secretKey);
  }
  if (socialType === "github" && github.clientId && github.secretKey) {
    return new Github(github.clientId, github.secretKey);
  }
  return SocialMock;
};

module.exports = {
  createOauth2Client,
};
