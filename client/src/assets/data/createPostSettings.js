import i18n from "../../i18n";

const POST_SETTINGS = {};

function fill() {
  POST_SETTINGS.shareWith = {
    default: { text: i18n.t("post.options.shareWith.city"), value: "City" },
    options: [
      { text: i18n.t("post.options.shareWith.city"), value: "City" },
      { text: i18n.t("post.options.shareWith.state"), value: "State" },
      { text: i18n.t("post.options.shareWith.country"), value: "Country" },
      { text: i18n.t("post.options.shareWith.worldwide"), value: "Worldwide" },
    ],
  };

  POST_SETTINGS.expires = {
    default: { text: i18n.t("post.options.expires.month"), value: "Month" },
    options: [
      { text: i18n.t("post.options.expires.forever"), value: "Forever" },
      { text: i18n.t("post.options.expires.month"), value: "Month" },
      { text: i18n.t("post.options.expires.week"), value: "Week" },
      { text: i18n.t("post.options.expires.day"), value: "Day" },
    ],
  };

  POST_SETTINGS.helpTypes = {
    default: { text: "", value: "" },
    options: [
      { text: i18n.t("post.options.helpTypes.request"), value: "request" },
      { text: i18n.t("post.options.expires.offer"), value: "offer" },
    ],
  };
}

// initial translation
fill();

// refill on langauge change
i18n.on("languageChanged", () => {
  fill();
});

export default POST_SETTINGS;
