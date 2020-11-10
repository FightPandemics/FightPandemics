// Core
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

// Local
import { FeedContext } from "pages/Feed.js";
import ButtonTag from "../Tag/ButtonTag.js";
import { getOptionText } from "components/Feed/utils";

const LOCATION_DISPLAY_LENGTH_MAX = 30;

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
      {Object.keys(selectedOptions).map((filter) => {
        if (filter === "lookingFor") return;
        return selectedOptions[filter].map((option, idx) => (
          <ButtonTag
            key={idx}
            onClick={handleOption(filter, option)}
            className="tag-closable"
          >
            {t(getOptionText(filters, filter, option.value || option))}
          </ButtonTag>
        ));
      })}
    </div>
  );
};

export default FiltersList;
