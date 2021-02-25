import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { theme, mq } from "../../constants/theme";
import GTM from "../../constants/gtm-tags";
import LocationInput from "../Input/LocationInput";
import InputError from "../Input/InputError";
import ButtonTag from "../Tag/ButtonTag";
import FacilityCard from "./FacilityCard";
import FacilityMap from "./FacilityMap";
import FacilityView from "./FacilityView";
import ConfirmedCases from "./ConfirmedCases";
import { useTranslation } from "react-i18next";
import { WhiteSpace } from "antd-mobile";
import { Spin } from "antd";

const { colors, typography } = theme;
const { darkerGray, white, royalBlue, black } = colors;
const { xxlarge, large, medium, small } = typography.size;

const NearestLocationContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block;
  }
  @media screen and (max-width: ${mq.tablet.narrow.maxWidth}) {
    display: block;
  }
`;

let isIPhone = false;
const HealthFacilitiesContainer = styled.div`
  flex-basis: 55%;
  align-self: flex-start;
  padding-top: 2rem;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    margin: ${(props) => (props.isIPhone ? "22rem 0 0 0" : "20rem 0 0 0")};
  }
  h2 {
    font-weight: bold;
    color: ${darkerGray};
    margin-left: 2rem;
  }
`;

const HealthFacilitiesListContainer = styled.div`
  overflow-y: scroll;
  height: 100vh;
  scroll-behavior: smooth;
`;

const ShareLocationContainer = styled.div`
  padding: 6rem;
  border-radius: 0.2rem;
  margin-top: 4rem;
  border: 0.1rem solid rgba(0, 0, 0, 0.12);
  background-color: ${white};
  h1 {
    font-size: ${xxlarge};
    color: ${darkerGray};
    text-align: center;
    padding: 0 5rem;
    font-weight: bold;
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    padding: 0;
    min-height: 100vh;
    margin-top: 0;
    padding-top: 4rem;
    border: 0;
    h1 {
      padding: 0 2rem;
    }
  }
`;

const ShareLocationInputContainer = styled.div`
  align-self: flex-end;
  white-space: nowrap;
  background-color: ${colors.offWhite};
  margin: 0 2rem;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    margin: 0 2rem;
  }
`;

const ChangeLocOrTypeContainer = styled.div`
  background-color: ${white};
  border: 0.1rem solid rgba(0, 0, 0, 0.12);
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: flow-root;
    position: fixed;
    top: 5rem;
    z-index: 2;
  }
  &:hover {
    color: ${royalBlue};
  }
  &:active {
    color: ${royalBlue};
  }
  h1 {
    padding: 0 1rem 1rem 0;
    font-weight: bold;
    color: ${black};
    font-size: ${medium};
  }
`;

const TypeButtonsWrapper = styled.div`
  display: inline-flex;
  margin: 1rem 0 2.5rem 0;
  .tags-selector {
    margin-right: -0.3rem;
    margin-left: -0.3rem;
  }
`;

const ChangeLocationContainer = styled.div`
  display: inline-flex;
  align-self: flex-end;
  white-space: nowrap;
  background-color: ${colors.offWhite};
  margin: 0 2rem 2rem 2rem;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: flow-root;
    margin: 0 2rem;
  }
`;

const NoResultsContainer = styled.div`
  background-color: ${colors.offWhite};
  h4 {
    padding: 0 0 0 0;
    font-weight: bold;
    color: ${black};
    font-size: ${medium};
  }
  span {
    padding: 0 0 0 0;
    font-weight: normal;
    color: ${black};
    font-size: ${small};
  }
`;

const ModeContainer = styled.button`
  type: submit;
  width: 9rem;
  height: 3rem;
  border-radius: 4rem;
  background-color: ${black};
  position: -webkit-sticky;
  position: fixed;
  bottom: 4rem;
  left: 38%;
  z-index: 3;
`;

const ModeLabel = styled.div`
  color: ${white};
  white-space: nowrap;
`;

const moreResultsUrlStyles = {
  paddingTop: "2rem",
  paddingLeft: "2rem",
  fontWeight: "500",
  color: royalBlue,
  fontSize: large,
};

const NearestHealthFacilities = () => {
  const { t } = useTranslation();
  const facilityTypes = [
    { type: "hospital", label: t("nearestHsp.hospitals"), default: true },
    { type: "doctor", label: t("nearestHsp.doctors"), default: false },
    { type: "pharmacy", label: t("nearestHsp.pharmacies"), default: false },
  ];
  const facilityModeTypes = [
    { type: "list", label: t("nearestHsp.viewMap"), default: true },
    { type: "map", label: t("nearestHsp.viewList"), default: false },
  ];
  const [apiError, setApiError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [view, setView] = useState("HealthFacilities");
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [facilityMode, setFacilityMode] = useState(
    facilityModeTypes.find((m) => m.default === true),
  );
  const [selectedType, setSelectedType] = useState(
    facilityTypes.find((t) => t.default === true).type,
  );
  const [facilitiesData, setFacilitiesData] = useState(null);
  const sourceLocation = useRef(null);

  const hidingViewTabs = true; //until Confirmed Cases component is ready

  const initialize = () => {
    const feedLocation = sessionStorage.getItem("feedLocation");
    const defaultLocation = feedLocation ? JSON.parse(feedLocation) : null;
    sourceLocation.current = defaultLocation;
    handleLocationChange(sourceLocation.current);

    if (window.screen.width <= parseInt(mq.phone.wide.maxWidth)) {
      setIsMobile(true);
      if (!(navigator.userAgent.toLowerCase().indexOf("iphone") === -1)) {
        isIPhone = true;
      }
    }
  };

  useEffect(initialize, []);

  const loadData = useCallback(async (location, type) => {
    setApiError(null);
    try {
      setLoadingPlaces(true);
      const { data } = await axios.get(
        `/api/geo/health-facility-places?lat=${location.coordinates[1]}&lng=${location.coordinates[0]}&type=${type}`,
      );
      setFacilitiesData(
        data.map((facility, i) => {
          return {
            ...facility,
            name: i + 1 + ". " + facility.name,
            geometry_location: checkDupCoordinates(facility, data),
          };
        }),
      );
    } catch (error) {
      setApiError(t("error.failedHealthFacPlaces"));
    } finally {
      setLoadingPlaces(false);
    }
  });

  const checkDupCoordinates = (facility, data) => {
    if (
      data.some(
        (item) =>
          item.geometry_location.lat === facility.geometry_location.lat &&
          item.geometry_location.lng === facility.geometry_location.lng &&
          item.place_id != facility.place_id,
      )
    ) {
      //slightly offset coord in order to see the marker if duplicate
      const min = 0.999999;
      const max = 1.000001;
      return {
        lat:
          facility.geometry_location.lat * (Math.random() * (max - min) + min),
        lng:
          facility.geometry_location.lng * (Math.random() * (max - min) + min),
      };
    } else {
      return facility.geometry_location;
    }
  };

  const handleLocationChange = async (location) => {
    sourceLocation.current = location;
    if (sourceLocation.current) {
      await loadData(sourceLocation.current, selectedType);
    }
  };

  const handleTypeClick = useCallback(
    (e, type) => {
      e.persist();
      e.stopPropagation();
      setSelectedType(type);
      if (sourceLocation.current) {
        loadData(sourceLocation.current, type);
      }
    },
    [loadData],
  );

  const handleViewClick = (viewName) => {
    setView(viewName);
  };

  const onToggleFacilityMode = useCallback(
    (e, currentMode) => {
      e.persist();
      e.stopPropagation();
      setFacilityMode(
        currentMode.type === "list"
          ? facilityModeTypes[1]
          : facilityModeTypes[0],
      );
    },
    [facilityModeTypes],
  );

  const renderDirectToGoogleMapsURL = () => {
    const moreResultsUrl = `https://www.google.com/maps/search/${selectedType}/@${sourceLocation.current.coordinates[1]},${sourceLocation.current.coordinates[0]},13z`;
    const forMoreResults = t("nearestHsp.forMoreResults");

    return (
      sourceLocation.current && (
        <a
          href={moreResultsUrl}
          key={"forMoreResults"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {forMoreResults}
        </a>
      )
    );
  };

  if (loadingPlaces) return <Spin size="medium" />;

  return (
    <div>
      {isMobile ? (
        <>
          {!hidingViewTabs ? (
            <FacilityView
              selectedView={view}
              onViewClick={handleViewClick}
            ></FacilityView>
          ) : (
            <WhiteSpace />
          )}
          {sourceLocation.current && view === "HealthFacilities" ? (
            <ModeContainer
              onClick={(e) => {
                onToggleFacilityMode(e, facilityMode);
              }}
            >
              <ModeLabel>{facilityMode.label}</ModeLabel>
            </ModeContainer>
          ) : (
            <WhiteSpace />
          )}
        </>
      ) : (
        <WhiteSpace />
      )}
      {view === "HealthFacilities" && sourceLocation.current ? (
        <ChangeLocOrTypeContainer>
          <TypeButtonsWrapper>
            <h1>{t("nearestHsp.facility")}</h1>
            <div className="tags-selector">
              {facilityTypes.map(({ type, label }, idx) => (
                <ButtonTag
                  className={
                    "tag-selectable " +
                    (selectedType === type ? "tag-selected" : "")
                  }
                  onClick={(e) => {
                    handleTypeClick(e, type);
                  }}
                  label={label}
                  id={
                    GTM.nearestHospital.prefix +
                    GTM.nearestHospital.facilityType +
                    idx
                  }
                  key={idx}
                >
                  {label}
                </ButtonTag>
              ))}
            </div>
          </TypeButtonsWrapper>
          <ChangeLocationContainer>
            <h1>{t("nearestHsp.changeLoc")}</h1>
            <LocationInput
              location={sourceLocation.current}
              onLocationChange={handleLocationChange}
              includeNavigator={false}
              gtmPrefix={
                GTM.nearestHospital.prefix + GTM.nearestHospital.locationChange
              }
            />
          </ChangeLocationContainer>
        </ChangeLocOrTypeContainer>
      ) : (
        <WhiteSpace />
      )}
      {view === "HealthFacilities" ? (
        sourceLocation.current ? (
          <NearestLocationContainer>
            {!isMobile || (isMobile && facilityMode.type === "list") ? (
              <HealthFacilitiesContainer isIPhone={isIPhone}>
                <h2>
                  {facilityTypes.find((o) => o.type === selectedType).label}
                </h2>
                <HealthFacilitiesListContainer>
                  {apiError && <InputError>{apiError}</InputError>}
                  {!apiError &&
                    (facilitiesData && facilitiesData.length > 0 ? (
                      facilitiesData.map((data, idx) => (
                        <FacilityCard
                          key={idx + 1}
                          facilityName={data.name}
                          facilityAddress={data.formatted_address}
                          contactNo={data.international_phone_number}
                          distance={data.distance}
                          isOpen={data.open_now}
                          periods={data.opening_hours_periods}
                          floating={false}
                          url={data.url}
                        />
                      ))
                    ) : (
                      <NoResultsContainer>
                        <h1>{t("nearestHsp.noResults")}</h1>
                        <span>{t("nearestHsp.tryAdjusting")}</span>
                      </NoResultsContainer>
                    ))}
                  <div style={moreResultsUrlStyles}>
                    {renderDirectToGoogleMapsURL()}
                  </div>
                </HealthFacilitiesListContainer>
              </HealthFacilitiesContainer>
            ) : (
              <WhiteSpace />
            )}
            {!isMobile || (isMobile && facilityMode.type === "map") ? (
              <FacilityMap
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                defaultCenter={sourceLocation.current}
                defaultZoom={11}
                facilities={facilitiesData}
              />
            ) : (
              <WhiteSpace />
            )}
          </NearestLocationContainer>
        ) : (
          <ShareLocationContainer>
            <h1>{t("nearestHsp.shareLoc")}</h1>
            <ShareLocationInputContainer>
              <LocationInput
                location={sourceLocation.current}
                onLocationChange={handleLocationChange}
                includeNavigator={false}
                gtmPrefix={
                  GTM.nearestHospital.prefix + GTM.nearestHospital.locationShare
                }
              />
            </ShareLocationInputContainer>
          </ShareLocationContainer>
        )
      ) : (
        <ConfirmedCases />
      )}
    </div>
  );
};

export default NearestHealthFacilities;
