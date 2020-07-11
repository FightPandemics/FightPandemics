import React, { useContext } from "react";
import { FeedContext } from "pages/Feed.js";
import ButtonTag from "../Tag/ButtonTag";
import LocationInput from "components/Input/LocationInput";
import { FilterAccordion, FilterAccordionPanel } from "./StyledAccordion";
import GTM from "constants/gtm-tags";

const providersGtmTagsMap = {
  0: GTM.providersFilters.individual,
  1: GTM.providersFilters.startUp,
  2: GTM.providersFilters.company,
  3: GTM.providersFilters.community,
  4: GTM.providersFilters.government,
  5: GTM.providersFilters.researchAndDevelopment,
  6: GTM.providersFilters.nonProfit,
  7: GTM.providersFilters.university,
  8: GTM.providersFilters.healthCareProvider,
  9: GTM.providersFilters.others,
};

const typeGtmTagsMap = {
  0: GTM.typeFilter.medicalSupplies,
  1: GTM.typeFilter.groceriesFood,
  2: GTM.typeFilter.business,
  3: GTM.typeFilter.education,
  4: GTM.typeFilter.legal,
  5: GTM.typeFilter.wellbeingMental,
  6: GTM.typeFilter.entertainment,
  7: GTM.typeFilter.information,
  8: GTM.typeFilter.researchAndDevelopment,
  9: GTM.typeFilter.tech,
  10: GTM.typeFilter.other,
};

const providersOrType = (label, idx) => {
  return label === "providers"
    ? GTM.post.providers + providersGtmTagsMap[idx]
    : GTM.post.type + typeGtmTagsMap[idx];
};

const FilterAccord = ({ gtmPrefix }) => {
  const feedContext = useContext(FeedContext);
  const {
    activePanel,
    filters,
    handleLocation,
    handleOption,
    location,
    selectedOptions,
  } = feedContext;

  const gtmTag = (tag) => gtmPrefix + tag;

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
            id={gtmTag(GTM.post.location)}
          >
            <LocationInput
              location={location}
              onLocationChange={handleLocation}
              includeNavigator={true}
              gtmPrefix={gtmTag(GTM.post.location)}
            />
          </FilterAccordionPanel>
        );
      } else {
        return (
          <FilterAccordionPanel
            header={capitalizeFirstLetter(filter.label)}
            className={filter.className}
            key={idx}
            id={
              filter.label === "providers"
                ? gtmTag(GTM.post.providers)
                : gtmTag(GTM.post.type)
            }
          >
            {Object.values(filter.options).map((option, idx) => {
              return (
                <ButtonTag
                  id={gtmPrefix + providersOrType(filter.label, idx)}
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
