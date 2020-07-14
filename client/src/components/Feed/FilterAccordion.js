import React, { useContext } from "react";
import { FeedContext } from "pages/Feed.js";
import ButtonTag from "../Tag/ButtonTag";
import LocationInput from "components/Input/LocationInput";
import { FilterAccordion, FilterAccordionPanel } from "./StyledAccordion";
import GTM from "constants/gtm-tags";
import styled from "styled-components";

const providersGtmTagsMap = {
  0: GTM.providersFilters.individual,
  1: GTM.providersFilters.startUp,
  2: GTM.providersFilters.company,
  3: GTM.providersFilters.community,
  4: GTM.providersFilters.government,
  5: GTM.providersFilters.nonProfit,
  6: GTM.providersFilters.university,
  7: GTM.providersFilters.healthCareProvider,
  8: GTM.providersFilters.others,
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
  8: GTM.typeFilter.funding,
  9: GTM.typeFilter.researchAndDevelopment,
  10: GTM.typeFilter.tech,
  11: GTM.typeFilter.other,
};

const requestOrOffer = {
  0: GTM.requestHelp.prefix,
  1: GTM.offerHelp.prefix,
};

const gtmTagsMap = {
  "offer or request help": GTM.post.requestOffer,
  type: GTM.post.type,
  location: GTM.post.location,
  providers: GTM.post.providers,
};

const AccordionHeader = styled.div`
  width: 100%;
`;

const filterOps = (label, idx) => {
  if (label === "offer or request help") {
    return `_${requestOrOffer[idx]}`;
  }
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
            header={
              <AccordionHeader id={gtmTag(GTM.post.location)}>
                {capitalizeFirstLetter(filter.label)}
              </AccordionHeader>
            }
            className={filter.className}
            key={idx}
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
            header={
              <AccordionHeader id={gtmTag(gtmTagsMap[filter.label])}>
                {capitalizeFirstLetter(filter.label)}
              </AccordionHeader>
            }
            className={filter.className}
            key={idx}
          >
            {Object.values(filter.options).map((option, idx) => {
              return (
                <ButtonTag
                  id={gtmPrefix + filterOps(filter.label, idx)}
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
