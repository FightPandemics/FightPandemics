// Core
import React, { useContext } from "react";

// Local
import { FeedContext } from "pages/Feed.js";
import ButtonTag from "../Tag/ButtonTag.js";

const LOCATION_DISPLAY_LENGTH_MAX = 30;

const FiltersList = () => {
  const feedContext = useContext(FeedContext);
  const {
    handleLocation,
    handleOption,
    location,
    selectedOptions,
    filters,
  } = feedContext;

  const getOptionText = (filterOptions, filterLabel, option) =>
    filterOptions
      .filter(({ label }) => label === filterLabel)[0]
      .options.filter(({ value }) => value === option)[0].text;

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
            {getOptionText(filters, filter, option)}
          </ButtonTag>
        )),
      )}
    </div>
  );
};

export default FiltersList;
