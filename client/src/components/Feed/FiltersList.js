// Core
import React, { useContext } from "react";

// Local
import { FeedContext } from "pages/Feed.js";
import ButtonTag from "../Tag/ButtonTag.js";

const LOCATION_DISPLAY_LENGTH_MAX = 30;

const FiltersList = () => {
  const feedContext = useContext(FeedContext);
  const { handleLocation, handleOption, location, selectedOptions } = feedContext;

  return (
    <div>
      {location &&
        <ButtonTag
          className="tag-closable"
          onClick={() => handleLocation(null)}
        >
          {location?.address?.length > LOCATION_DISPLAY_LENGTH_MAX ?
            `${location?.address?.substr(0, LOCATION_DISPLAY_LENGTH_MAX)}…`
            : location?.address }
        </ButtonTag>
      }
      {Object.keys(selectedOptions).map((filter) =>
        selectedOptions[filter].map((option, idx) => (
          <ButtonTag
            key={idx}
            onClick={handleOption(filter, option)}
            className="tag-closable"
          >
            {option}
          </ButtonTag>
        )),
      )}
    </div>
  );
};

export default FiltersList;
