// Core
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

// Local
import { FeedContext } from "pages/Feed.js";
import ButtonTag from "../Tag/ButtonTag.js";

const LOCATION_DISPLAY_LENGTH_MAX = 30;

const getOptionText = (filterOptions, filterLabel, option) => {
  let optionValue;
  if (typeof option === "string") {
    optionValue = option;
  } else if (typeof option === "object") {
    optionValue = option.value;
  }

  return filterOptions
    .filter(({ label }) => label === filterLabel)[0]
    .options.filter(({ value }) => value === optionValue)[0].text;
};

const FiltersList = () => {
  const { t } = useTranslation();
  const feedContext = useContext(FeedContext);
  const {
    handleLocation,
    handleOption,
    location,
    selectedOptions,
    filters,
  } = feedContext;

  return (
    <div>
      {location && (
        <ButtonTag
          className="tag-closable"
          onClick={() => handleLocation(null)}
        >
          {location?.address?.length > LOCATION_DISPLAY_LENGTH_MAX
            ? `${location?.address?.substr(0, LOCATION_DISPLAY_LENGTH_MAX)}…`
            : location?.address}
        </ButtonTag>
      )}
      {Object.keys(selectedOptions).map((filter) =>
        selectedOptions[filter].map((option, idx) => (
          <ButtonTag
            key={idx}
            onClick={handleOption(filter, option)}
            className="tag-closable"
          >
            {t(getOptionText(filters, filter, option))}
          </ButtonTag>
        )),
      )}
    </div>
  );
};

export default FiltersList;
