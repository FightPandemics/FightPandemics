// text props are translation keys

const POST_SETTINGS = {
  shareWith: {
    default: { text: "post.options.shareWith.city", value: "City" },
    options: [
      { text: "post.options.shareWith.city", value: "City" },
      { text: "post.options.shareWith.state", value: "State" },
      { text: "post.options.shareWith.country", value: "Country" },
      { text: "post.options.shareWith.worldwide", value: "Worldwide" },
    ],
  },
  expires: {
    default: { text: "post.options.expires.month", value: "Month" },
    options: [
      { text: "post.options.expires.forever", value: "Forever" },
      { text: "post.options.expires.month", value: "Month" },
      { text: "post.options.expires.week", value: "Week" },
      { text: "post.options.expires.day", value: "Day" },
    ],
  },
  helpTypes: {
    default: { text: "", value: "" },
    options: [
      { text: "post.options.helpTypes.request", value: "request" },
      { text: "post.options.expires.offer", value: "offer" },
    ],
  },
};

export default POST_SETTINGS;
