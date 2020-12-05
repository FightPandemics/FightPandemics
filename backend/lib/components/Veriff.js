const axios = require("axios");
const crypto = require("crypto");
const { config } = require("../../config");

const {
  veriff: { baseUrl: BASE_URL, publicKey: PUBLIC_KEY, privateKey: PRIVATE_KEY },
} = config;

const generateXSignature = async (payload) => {
  const signature = crypto.createHash("sha256");
  signature.update(new Buffer.from(payload, "utf8"));
  signature.update(new Buffer.from(PRIVATE_KEY, "utf8"));
  return signature.digest("hex");
};

const createSessionUrl = async (user) => {
  const body = {
    verification: {
      callback: "https://google.com",
      person: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      vendorData: user._id,
      lang: "en",
      timestamp: new Date(),
    },
  };

  try {
    const res = await axios({
      url: "/v1/sessions/",
      method: "POST",
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-CLIENT": PUBLIC_KEY,
      },
      data: body,
    });

    if (res.data.status === "success") return res.data.verification.url;
    return null;
  } catch (err) {
    return null;
  }
};

const validateWebhookEvent = async (req, reply, done) => {
  const incomingXAuthClient = req.headers["x-auth-client"];
  if (PUBLIC_KEY !== incomingXAuthClient) return false;

  const rawBody = JSON.stringify(req.body);
  const incomingXSignature = req.headers["x-signature"];
  const xSignature = await generateXSignature(rawBody);

  if (xSignature != incomingXSignature) throw false;
  else return done();
};

module.exports = {
  createSessionUrl,
  validateWebhookEvent,
};
