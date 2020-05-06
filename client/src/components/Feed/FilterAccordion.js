import { FilterAccordion, FilterAccordionPanel } from "./StyledAccordion";
import React, { useContext } from "react";

import { FeedContext } from "../../pages/Feed.js";
import FilterTag from "../Tag/FilterTag";
import LocationSearch from "../../components/Input/LocationSearch";

const FilterAccord = () => {
  const feedContext = useContext(FeedContext);
  const { filters, activePanel, handleOption, selectedOptions } = feedContext;

  const renderPanels = (filters) => {
    return filters.map((filter, idx) => {
      if (filter.label === "Location") {
        return (
          <FilterAccordionPanel
            header={filter.label}
            className={filter.className}
            key={idx}
          >
            <LocationSearch />
          </FilterAccordionPanel>
        );
      } else {
        return (
          <FilterAccordionPanel
            header={filter.label}
            className={filter.className}
            key={idx}
          >
            {Object.values(filter.options).map((option, idx) => (
              <FilterTag
                key={idx}
                onClick={handleOption(filter.label, option)}
                selected={
                  selectedOptions[filter.label] &&
                  selectedOptions[filter.label].includes(option)
                }
              >
                {option}
              </FilterTag>
            ))}
          </FilterAccordionPanel>
        );
      }
    });
  };

  return (
    <FilterAccordion
      accordion
      defaultActiveKey={activePanel}
      className="my-accordion"
    >
      {renderPanels(filters)}
    </FilterAccordion>
  );
};

export default FilterAccord;
