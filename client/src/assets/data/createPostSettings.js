export default {
  shareWith: {
    type: "shareWith",
    title: "Share with ...",
    default: { text: "In my Zip Code", label: "Zip Code", value: "zipCode" },
    options: [
      { text: "In my Zip Code", label: "Zip Code", value: "zipCode" },
      { text: "In my State", label: "State", value: "state" },
      { text: "In my Country", label: "Country", value: "country" },
      { text: "Worldwide", label: "Worldwide", value: "worldwide" },
    ],
  },
  expires: {
    type: "expires",
    title: "For how long do you want to keep your post?",
    default: { text: "Forever", label: "Forever", value: "forever" },
    options: [
      { text: "Forever", label: "Forever", value: "forever" },
      { text: "For a month", label: "Month", value: "month" },
      { text: "For a week", label: "Week", value: "week" },
      { text: "For a day", label: "Day", value: "day" },
    ],
  },
  helpTypes: {
    type: "helpTypes",
    title: "",
    default: { text: "", label: "", value: "" },
    options: [
      { text: "Looking for help", label: "Looking", value: "looking" },
      { text: "Offering to help", label: "Offering", value: "offering" },
    ],
  },
};
