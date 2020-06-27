const axios = require("axios");
const { sendgridContactSchema } = require("./schema/sendgrid");
const {
  config: { sendgrid: sendgridConfig },
} = require("../../config");

const populateSendgridContactsObj = (body) => {
  return {
    contacts: [
      {
        email: body.email,
        ...body.location,
        state_province_region: body.location.state,
        list_ids: [sendgridConfig.contactsListId],
      },
    ],
    list_ids: [sendgridConfig.contactsListId],
  };
};

const getHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${sendgridConfig.apiKey}`,
      "Content-Type": "application/json",
    },
  };
};

/*
 * /api/sendgrid
 */
async function routes(app) {
  app.put("/create-contact", { schema: sendgridContactSchema }, async (req) => {
    try {
      let contacts = populateSendgridContactsObj(req.body);
      await axios.put(sendgridConfig.contactsApiUrl, contacts, getHeaders());
      req.log.info(
        `Contact with email=${req.body.email} created successfully in SendGrid!`,
      );
    } catch (err) {
      req.log.error(err);
      throw app.httpErrors.internalServerError();
    }
  });
}

module.exports = routes;
