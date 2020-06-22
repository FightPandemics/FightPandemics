import React, { useContext } from "react";
import { FeedContext } from "pages/Feed.js";
import ButtonTag from "../Tag/ButtonTag";
import LocationInput from "components/Input/LocationInput";
import { FilterAccordion, FilterAccordionPanel } from "./StyledAccordion";

const FilterAccord = () => {
  const feedContext = useContext(FeedContext);
  const {
    activePanel,
    filters,
    handleLocation,
    handleOption,
    location,
    selectedOptions,
  } = feedContext;

  function capitalizeFirstLetter(header) {
    return header.charAt(0).toUpperCase() + header.slice(1);
  }
  const renderPanels = () => {
    return filters.map((filter, idx) => {
      if (filter.label === "location") {
        return (
          <FilterAccordionPanel
            header={capitalizeFirstLetter(filter.label)}
            className={filter.className}
            key={idx}
          >
            <LocationInput
              location={location}
              onLocationChange={handleLocation}
              includeNavigator={true}
            />
          </FilterAccordionPanel>
        );
      } else {
        return (
          <FilterAccordionPanel
            header={capitalizeFirstLetter(filter.label)}
            className={filter.className}
            key={idx}
          >
            {Object.values(filter.options).map((option, idx) => {
              return (
                <ButtonTag
                  key={idx}
                  onClick={handleOption(filter.label, option)}
                  className={
                    "tag-selectable " +
                    (selectedOptions[filter.label] &&
                    selectedOptions[filter.label].includes(option)
                      ? "tag-selected"
                      : "")
                  }
                >
                  {option}
                </ButtonTag>
              );
            })}
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
