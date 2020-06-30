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
  app.put(
    "/create-contact",
    { schema: sendgridContactSchema },
    async (req, res) => {
      try {
        let contacts = populateSendgridContactsObj(req.body);
        axios.put(sendgridConfig.contactsApiUrl, contacts, getHeaders());
        res.send(`Contact with email=${req.body.email} created successfully!`);
      } catch (err) {
        req.log.error(err);
        throw app.httpErrors.internalServerError();
      }
    },
  );
}

module.exports = routes;
