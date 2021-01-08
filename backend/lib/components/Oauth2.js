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

const socialClasses = {
  facebook: {
    SocialClass: Facebook,
    config: facebook,
  },
  github: {
    SocialClass: Github,
    config: github,
  },
  instagram: {
    SocialClass: Instagram,
    config: instagram,
  },
  linkedin: {
    SocialClass: Linkedin,
    config: linkedin,
  },
  twitter: {
    SocialClass: Twitter,
    config: twitter,
  },
};

// abstract factory to create oauth2 client
const createOauth2Client = (socialType) => {
  if (!Object.prototype.hasOwnProperty.call(socialClasses, socialType)) {
    throw new Error("Unsupported Social Type");
  }
  const { SocialClass, config } = socialClasses[socialType];
  if (config.clientId && config.secretKey) {
    return new SocialClass(config.clientId, config.secretKey);
  }
  return SocialMock;
};

module.exports = {
  createOauth2Client,
};
