export default {
  shareWith: {
    type: "shareWith",
    label: "Share with ...",
    options: [
      { label: "In my Zip Code", value: "zipCode" },
      { label: "In my State", value: "state" },
      { label: "In my Country", value: "country" },
      { label: "Worldwide", value: "worldwide" },
    ],
  },
  expires: {
    type: "expires",
    label: "For how long do you want to keep your post?",
    options: [
      { label: "Forever", value: "Forever" },
      { label: "For a month", value: "month" },
      { label: "For a week", value: "week" },
      { label: "For a day", value: "day" },
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
