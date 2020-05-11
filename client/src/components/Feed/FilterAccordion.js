import React, { useContext } from "react";
import { FeedContext } from "pages/Feed.js";
import FilterTag from "../Tag/FilterTag";
import LocationSearch from "components/Input/LocationSearch";
import { FilterAccordion, FilterAccordionPanel } from "./StyledAccordion";

const FilterAccord = () => {
  const feedContext = useContext(FeedContext);
  const { filters, activePanel, handleOption, selectedOptions } = feedContext;

  const renderPanels = () => {
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
                onChange={handleOption(filter.label, option)}
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
      {renderPanels()}
    </FilterAccordion>
  );
};

export default FilterAccord;
