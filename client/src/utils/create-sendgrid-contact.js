import axios from "axios";

// Sendgrid secrets
const sendgrid_contacts_url = process.env.REACT_APP_SENDGRID_CONTACS_API_URL;
const sendgrid_api_key = process.env.REACT_APP_SENDGRID_API_KEY;
const sendgrid_list_id = process.env.REACT_APP_SENDGRID_LIST_ID;

const populateSendgridContactsObj = (stepsData) => {
  let sendgridContactsObject = {
    contacts: [
      {
        list_ids: [sendgrid_list_id],
        ...stepsData,
      },
    ],
    list_ids: [sendgrid_list_id],
  };
  return sendgridContactsObject;
};

const createSengridContact = async (stepsData) => {
  let contacts = populateSendgridContactsObj(stepsData);
  console.log(contacts);
  try {
    await axios.put(sendgrid_contacts_url, contacts, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sendgrid_api_key}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default createSengridContact;
