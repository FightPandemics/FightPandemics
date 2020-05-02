// https://stackoverflow.com/questions/52456065/how-to-format-and-validate-email-node-js/52456632
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const cleanEmail = (email) => {
  if (!email) return false;
  // a few with multiple emails, only take first
  let [cleaned] = email.split(",");
  // trim trailing whitespace & periods
  cleaned = cleaned.trim();
  cleaned = cleaned.replace(/^\.|\.$/g, "");
  // some other non-emails (extra link, whatsapp), just skip these
  return emailRegexp.test(cleaned) && cleaned;
};

module.exports = (post, sourcedBy) => {
  /* eslint-disable prefer-const */
  let {
    android_app: playStore,
    city,
    country,
    from_whom: [authorType] = ["Other"], // provided as array even though we only want [one]
    ios_app: appStore,
    post_description: content,
    post_email: email,
    post_language: language,
    post_name: title,
    post_objective: [objective],
    post_type: types,
    post_website: website,
    share_with: [visibility] = ["worldwide"],
    state,
  } = post.fields;
  /* eslint-enable prefer-const */

  if (authorType === "Others") {
    authorType = "Other";
  } else if (authorType === "Non-Profit") {
    authorType = "Non-profit";
  }
  objective = objective.toLowerCase();
  visibility = visibility === "Global" ? "worldwide" : visibility.toLowerCase();

  const author = {
    // author id/name will refer back to 'Sourced by FightPandemics'
    id: sourcedBy.id,
    // while location & type will reflect actual posting (for filtering)
    location: {},
    name: sourcedBy.name,
    type: authorType,
  };
  // only using [first] element if multiple in Airtable location fields
  if (country) [author.location.country] = country;
  if (state) [author.location.state] = state;
  if (city) [author.location.city] = city;
  // TODO: geocode country/state/city
  author.location.coordinates = [0, 0];

  const externalLinks = { website: website.trim() };
  if (appStore && appStore !== "NA") externalLinks.appStore = appStore.trim();
  if (playStore && playStore !== "NA")
    externalLinks.playStore = playStore.trim();
  email = cleanEmail(email);
  if (email) externalLinks.email = email;

  return {
    airtableId: post.id,
    author,
    content,
    externalLinks,
    language,
    objective,
    title,
    types,
    visibility,
  };
};
