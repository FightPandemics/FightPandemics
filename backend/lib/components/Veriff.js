const axios = require("axios");
const crypto = require("crypto");
const { config } = require("../../config");

const {
  veriff: { baseUrl: BASE_URL, publicKey: PUBLIC_KEY, privateKey: PRIVATE_KEY },
} = config;

// This will be needed to generate "X-SIGNATURE" to verify/modify the sessions
/*
const generateXSignature = async (verification) => {
  const payload = JSON.stringify(verification);
  const signature = crypto.createHash("sha256");
  signature.update(new Buffer.from(payload, "utf8"));
  signature.update(new Buffer.from(PRIVATE_KEY, "utf8"));
  return signature.digest("hex");
};
*/

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

  // for later use
  // const xSignatureHeader = await generateXSignature(body);

  try {
    const res = await axios({
      url: "/v1/sessions/",
      method: "POST",
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-CLIENT": PUBLIC_KEY,
        // for later use
        // "X-SIGNATURE": xSignatureHeader.toString(),
      },
      data: body,
    });

    if (res.data.status === "success") return res.data.verification.url;
    return null;
  } catch (err) {
    return null;
  }
};

module.exports = {
  createSessionUrl,
};
