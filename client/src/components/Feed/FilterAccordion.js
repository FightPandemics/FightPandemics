import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FeedContext } from "pages/Feed.js";
import ButtonTag from "../Tag/ButtonTag";
import LocationInput from "components/Input/LocationInput";
import {
  FilterAccordion,
  FilterAccordionPanel,
  AccordionHeader,
} from "./StyledAccordion";
import GTM from "constants/gtm-tags";
import { SET_VALUE } from "hooks/actions/feedActions";
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
  lookingFor: GTM.post.requestOffer,
  type: GTM.post.type,
  location: GTM.post.location,
  providers: GTM.post.providers,
};

const filterOps = (label, idx) => {
  if (label === "lookingFor") {
    return `_${requestOrOffer[idx]}`;
  }
  return label === "providers"
    ? GTM.post.providers + providersGtmTagsMap[idx]
    : GTM.post.type + typeGtmTagsMap[idx];
};

const FilterAccord = ({ gtmPrefix, locationOnly }) => {
  const { t } = useTranslation();
  const feedContext = useContext(FeedContext);
  const {
    activePanel,
    dispatchAction,
    filters,
    handleLocation,
    handleOption,
    location,
    selectedOptions,
  } = feedContext;

  const gtmTag = (tag) => gtmPrefix + tag;

  const setActivePanel = (activePanelKey) => {
    dispatchAction(SET_VALUE, "activePanel", activePanelKey);
  };

  const renderPanels = () => {
    return filters.map((filter, idx) => {
      if (filter.label === "location") {
        return (
          <FilterAccordionPanel
            header={
              <AccordionHeader id={gtmTag(GTM.post.location)}>
                {t(`feed.filters.labels.${filter.label}`)}
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
      } else if (!locationOnly) {
        return (
          <FilterAccordionPanel
            header={
              <AccordionHeader id={gtmTag(gtmTagsMap[filter.label])}>
                {t(`feed.filters.labels.${filter.label}`)}
              </AccordionHeader>
            }
            className={filter.className}
            key={idx}
          >
            {Object.values(filter.options).map(({ text, value }, idx) => {
              const tagClassName = `tag-selectable ${
                selectedOptions[filter.label] &&
                selectedOptions[filter.label].includes(value)
                  ? "tag-selected"
                  : ""
              }`;
              return (
                <ButtonTag
                  id={gtmPrefix + filterOps(filter.label, idx)}
                  key={idx}
                  onClick={handleOption(filter.label, value)}
                  className={tagClassName}
                >
                  {t(text)}
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
      activeKey={activePanel}
      className="my-accordion"
      onChange={setActivePanel}
    >
      {renderPanels()}
    </FilterAccordion>
  );
};

export default FilterAccord;
