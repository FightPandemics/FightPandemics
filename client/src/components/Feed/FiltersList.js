// Core
import React, { useContext } from "react";

// Local
import { FeedContext } from "pages/Feed.js";
import ButtonTag from "../Tag/ButtonTag.js";

const FiltersList = () => {
  const feedContext = useContext(FeedContext);
  const { handleOption, selectedOptions } = feedContext;
  return (
    <div>
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
