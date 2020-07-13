const axios = require("axios");
const { sendgridContactSchema } = require("./schema/sendgrid");
const {
  config: { sendgrid: sendgridConfig },
} = require("../../config");

const SENDGRID_CONTACTS_API_URL =
  "https://api.sendgrid.com/v3/marketing/contacts";

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

const getOps = (body) => {
  return {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sendgridConfig.apiKey}`,
    },
    data: JSON.stringify(populateSendgridContactsObj(body)),
    url: SENDGRID_CONTACTS_API_URL,
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
        axios(getOps(req.body))
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log("sendgrid error: " + error);
          });
        res.send("Contact created on sendgrid successfully!");
      } catch (err) {
        req.log.error(err);
        throw app.httpErrors.internalServerError();
      }
    },
  );
}

module.exports = routes;
