import i18n from "../../i18n";

let FILTER_OPTIONS = {};

function fill() {
  FILTER_OPTIONS = {
    location: {
      label: "location",
      className: "filter-1",
      options: [{}],
    },
    providers: {
      label: "providers",
      className: "filter-2",
      options: [
        {
          text: i18n.t("feed.filters.providersOptions.Individual"),
          value: "Individual",
        },
        {
          text: i18n.t("feed.filters.providersOptions.Startup"),
          value: "Startup",
        },
        {
          text: i18n.t("feed.filters.providersOptions.Company"),
          value: "Company",
        },
        {
          text: i18n.t("feed.filters.providersOptions.Community"),
          value: "Community",
        },
        {
          text: i18n.t("feed.filters.providersOptions.Government"),
          value: "Government",
        },
        {
          text: i18n.t("feed.filters.providersOptions.Non-profit"),
          value: "Non-profit",
        },
        {
          text: i18n.t("feed.filters.providersOptions.University"),
          value: "University",
        },
        {
          text: i18n.t("feed.filters.providersOptions.Health care provider"),
          value: "Health care provider",
        },
        { text: i18n.t("feed.filters.providersOptions.Other"), value: "Other" },
      ],
    },
    type: {
      label: "type",
      className: "filter-3",
      options: [
        {
          text: i18n.t("feed.filters.typesOptions.Medical Supplies"),
          value: "Medical Supplies",
        },
        {
          text: i18n.t("feed.filters.typesOptions.Groceries/Food"),
          value: "Groceries/Food",
        },
        {
          text: i18n.t("feed.filters.typesOptions.Business"),
          value: "Business",
        },
        {
          text: i18n.t("feed.filters.typesOptions.Education"),
          value: "Education",
        },
        { text: i18n.t("feed.filters.typesOptions.Legal"), value: "Legal" },
        {
          text: i18n.t("feed.filters.typesOptions.Wellbeing/Mental"),
          value: "Wellbeing/Mental",
        },
        {
          text: i18n.t("feed.filters.typesOptions.Entertainment"),
          value: "Entertainment",
        },
        {
          text: i18n.t("feed.filters.typesOptions.Information"),
          value: "Information",
        },
        { text: i18n.t("feed.filters.typesOptions.Funding"), value: "Funding" },
        { text: i18n.t("feed.filters.typesOptions.R&D"), value: "R&D" },
        { text: i18n.t("feed.filters.typesOptions.Tech"), value: "Tech" },
        { text: i18n.t("feed.filters.typesOptions.Other"), value: "Other" },
      ],
    },
    lookingFor: {
      label: "lookingFor",
      className: "filter-4",
      options: [
        {
          text: i18n.t("feed.filters.lookingForOptions.Request Help"),
          value: "Request Help",
        },
        {
          text: i18n.t("feed.filters.lookingForOptions.Offer Help"),
          value: "Offer Help",
        },
      ],
    },
  };
}

// initial translation
fill();

// refill on langauge change
i18n.on("languageChanged", () => {
  fill();
});

export default FILTER_OPTIONS;
