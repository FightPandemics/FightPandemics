import Pizzly from "pizzly-js";
const PIZZLY_HOSTNAME = "https://pizzly-try.herokuapp.com";
const PIZZLY_PUBLISHABLE_KEY = "e858BjHjbOzWQ6zGPFq5DB8GsXRbWzMJ";

const pizzly = new Pizzly({
  host: PIZZLY_HOSTNAME,
  publishableKey: PIZZLY_PUBLISHABLE_KEY,
});

const userInforMap = {
  facebook: { endpoint: "/me", urlLink: "/html_url" },
  instagram: { endpoint: "/me", urlLink: "/html_url" },
  linkedin: { endpoint: "/user", urlLink: "/html_url" },
  twitter: { endpoint: "/user", urlLink: "/html_url" },
  github: { endpoint: "/user", urlLink: "html_url" },
};

export const authUserLink = async (socialType) => {
  if (socialType in userInforMap) {
    const { endpoint, urlLink } = userInforMap[socialType];
    try {
      const socialAPI = pizzly.integration(socialType);
      const { authId } = await socialAPI.connect(); // authentication
      const userData = await (
        await socialAPI.auth(authId).get(endpoint)
      ).json(); // call API to get user data
      let linkStr = userData[urlLink] || null;
      if (linkStr) {
        linkStr = linkStr.substr(linkStr.lastIndexOf("/") + 1);
      }
      return linkStr;
    } catch (err) {
      // failed to retrieve user's url link
      return null;
    }
  }
};
