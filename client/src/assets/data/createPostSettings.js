export default {
  shareWith: {
    type: "shareWith",
    title: "Share with ...",
    default: { text: "Worldwide", value: "Worldwide" },
    options: [
      { text: "In my City", value: "City" },
      { text: "In my State", value: "State" },
      { text: "In my Country", value: "Country" },
      { text: "Worldwide", value: "Worldwide" },
    ],
  },
  expires: {
    type: "expires",
    title: "For how long do you want to keep your post?",
    default: { text: "Forever", value: "Forever" },
    options: [
      { text: "Forever", value: "Forever" },
      { text: "For a month", value: "Month" },
      { text: "For a week", value: "Week" },
      { text: "For a day", value: "Day" },
    ],
  },
  helpTypes: {
    type: "helpTypes",
    title: "",
    default: { text: "", value: "" },
    options: [
      { text: "Looking for help", value: "Looking" },
      { text: "Offering to help", value: "Offering" },
    ],
  },
};
