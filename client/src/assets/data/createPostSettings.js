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
      { text: "post.options.expires.day", value: "Day" },
      { text: "post.options.expires.week", value: "Week" },
      { text: "post.options.expires.month", value: "Month" },
      { text: "post.options.expires.forever", value: "Forever" },
    ],
  },
  helpTypes: {
    default: { text: "", value: "" },
    options: [
      { text: "post.options.helpTypes.request", value: "request" },
      { text: "post.options.expires.offer", value: "offer" },
    ],
  },
  workMode: {
    default: { text: "select", value: "Select an option" },
    options: [
      { text: "post.options.workMode.inPerson", value: "In-person" },
      { text: "post.options.workMode.remote", value: "Remote" },
      { text: "post.options.workMode.both", value: "Both" },
    ],
  },
};

export default POST_SETTINGS;
