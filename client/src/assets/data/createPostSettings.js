export default {
  shareWith: {
    type: "shareWith",
    label: "Share with ...",
    default: "Worldwide",
    options: [
      { label: "In my Zip Code", value: "Zip Code" },
      { label: "In my State", value: "State" },
      { label: "In my Country", value: "Country" },
      { label: "Worldwide", value: "Worldwide" },
    ],
  },
  expires: {
    type: "expires",
    label: "For how long do you want to keep your post?",
    default: "Forever",
    options: [
      { label: "Forever", value: "Forever" },
      { label: "For a month", value: "Month" },
      { label: "For a week", value: "Week" },
      { label: "For a day", value: "Day" },
    ],
  },
  helpTypes: {
    type: "helpTypes",
    label: "",
    options: [
      { label: "Looking for help", value: "looking" },
      { label: "Offering to help", value: "offering" },
    ],
  },
};
