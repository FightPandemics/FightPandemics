import axios from "axios";

// Sendgrid secrets
const sendgrid_contacts_url = process.env.REACT_APP_SENDGRID_CONTACS_API_URL;
const sendgri_api_key = process.env.REACT_APP_SENDGRID_API_KEY;
const sendgrid_list_id = process.env.REACT_APP_SENDGRID_LIST_ID;

let sendgridContactsObject = {
  contacts: [
    {
      list_ids: [sendgrid_list_id],
    },
  ],
  list_ids: [sendgrid_list_id],
};

const createSengridContact = async (stepsData) => {
  Object.assign(sendgridContactsObject.contacts[0], stepsData);
  try {
    const res = await axios.put(sendgrid_contacts_url, sendgridContactsObject, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sendgri_api_key}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default createSengridContact;
