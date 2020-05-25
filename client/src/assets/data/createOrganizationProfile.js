export default {
  type: {
    type: "type",
    title: "Type",
    default: { text: "Type", value: "Type" },
    options: [
      { text: "Startup", value: "Startup" },
      { text: "Company", value: "Company" },
      { text: "In my Country", value: "Country" },
      { text: "Community", value: "Community" },
      { text: "Government", value: "Government" },
      { text: "R&D", value: "R&D" },
      { text: "Non-profit", value: "Non-profit" },
      { text: "University", value: "University" },
      { text: "Health Care Provider", value: "Health Care Provider" },
      { text: "Other", value: "Other" },
    ],
  },
  industry: {
    type: "industry",
    title: "Industry",
    default: { text: "Industry", value: "Industry" },
    options: [
      { text: "Architecture", value: "Architecture" },
      { text: "Arts & Crafts", value: "Arts & Crafts" },
    ],
  },
};
