import React from "react";
import FilterTag from "../Tag/FilterTag";
import LocationSearch from "../../components/Input/LocationSearch";
import {
  FilterAccordion,
  FilterAccordionPanel,
} from "../Accordion/FilterAccordion";

export default ({
  filters,
  activePanel,
  setActivePanel,
  handleOption,
  location,
  handleLocation,
  shareMyLocation,
  selectedOptions,
}) => {
  const renderPanels = (filters) => {
    return filters.map((filter, idx) => {
      if (filter.label === "Location") {
        return (
          <FilterAccordionPanel header="Location" key={idx}>
            <LocationSearch
              location={location}
              handleLocation={handleLocation}
              shareMyLocation={shareMyLocation}
            />
          </FilterAccordionPanel>
        );
      } else {
        return (
          <FilterAccordionPanel header={filter.label} key={idx}>
            {Object.values(filter.options).map((option, idx) => (
              <FilterTag
                key={idx}
                label={option}
                handleClick={handleOption(filter.label, option)}
                selected={
                  selectedOptions[filter.label] &&
                  selectedOptions[filter.label].includes(option)
                }
              />
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
