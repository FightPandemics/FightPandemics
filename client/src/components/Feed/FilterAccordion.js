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
  handleTag,
  location,
  handleLocation,
  shareMyLocation,
  selectedFilters,
}) => {
  const renderFilterPanels = (filters) => {
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
                handleClick={handleTag(filter.label, option)}
                selected={
                  selectedFilters[filter.label] &&
                  selectedFilters[filter.label].includes(option)
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
      {renderFilterPanels(filters)}
    </FilterAccordion>
  );
};
