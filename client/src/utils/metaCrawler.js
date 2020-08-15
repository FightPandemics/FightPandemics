// Set in advanced settings - https://www.seo4ajax.com/docs/console/#site-settings-advanced
const META_CRAWLER_USER_AGENT = "seo4ajax";

const isMetaCrawler = () =>
  window.navigator.userAgent === META_CRAWLER_USER_AGENT;

export { isMetaCrawler };
