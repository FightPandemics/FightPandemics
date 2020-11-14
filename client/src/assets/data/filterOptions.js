// text props are translation keys

const FILTER_OPTIONS = {
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
        text: "feed.filters.providersOptions.Individual",
        value: "Individual",
      },
      {
        text: "feed.filters.providersOptions.Startup",
        value: "Startup",
      },
      {
        text: "feed.filters.providersOptions.Company",
        value: "Company",
      },
      {
        text: "feed.filters.providersOptions.Community",
        value: "Community",
      },
      {
        text: "feed.filters.providersOptions.Government",
        value: "Government",
      },
      {
        text: "feed.filters.providersOptions.Non-profit",
        value: "Non-profit",
      },
      {
        text: "feed.filters.providersOptions.University",
        value: "University",
      },
      {
        text: "feed.filters.providersOptions.Health care provider",
        value: "Health care provider",
      },
      { text: "feed.filters.providersOptions.Other", value: "Other" },
    ],
  },
  type: {
    label: "type",
    className: "filter-3",
    options: [
      {
        text: "feed.filters.typesOptions.Medical Supplies",
        value: "Medical Supplies",
      },
      {
        text: "feed.filters.typesOptions.Groceries/Food",
        value: "Groceries/Food",
      },
      {
        text: "feed.filters.typesOptions.Business",
        value: "Business",
      },
      {
        text: "feed.filters.typesOptions.Education",
        value: "Education",
      },
      { text: "feed.filters.typesOptions.Legal", value: "Legal" },
      {
        text: "feed.filters.typesOptions.Wellbeing/Mental",
        value: "Wellbeing/Mental",
      },
      {
        text: "feed.filters.typesOptions.Entertainment",
        value: "Entertainment",
      },
      {
        text: "feed.filters.typesOptions.Information",
        value: "Information",
      },
      { text: "feed.filters.typesOptions.Funding", value: "Funding" },
      { text: "feed.filters.typesOptions.R&D", value: "R&D" },
      { text: "feed.filters.typesOptions.Tech", value: "Tech" },
      { text: "feed.filters.typesOptions.Other", value: "Other" },
    ],
  },
  lookingFor: {
    label: "lookingFor",
    className: "filter-4",
    options: [
      {
        text: "feed.filters.lookingForOptions.Request Help",
        value: "Request Help",
      },
      {
        text: "feed.filters.lookingForOptions.Offer Help",
        value: "Offer Help",
      },
    ],
  },
};

export default FILTER_OPTIONS;
