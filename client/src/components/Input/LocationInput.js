import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Select, Spin } from "antd";
import { WhiteSpace } from "antd-mobile";
import { debounce } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

import InputError from "components/Input/InputError";
import SvgIcon from "components/Icon/SvgIcon";
import navigation from "assets/icons/navigation.svg";
import { asyncGetGeoLocation } from "utils/geolocation";
import { theme } from "constants/theme";
import GTM from "constants/gtm-tags";

const { darkGray, darkerGray, royalBlue, red } = theme.colors;
const { small, medium } = theme.typography.size;

const StyledSelect = styled(Select)`
  /* override antd extra x space */
  .ant-select-selector {
    padding: 0 !important;
  }
  .ant-select-selection-search {
    left: 0 !important;
    right: 0 !important;
  }

  width: 100%;
  padding: 0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${(props) => (props.disabled ? darkGray : royalBlue)};
  box-shadow: none;
  color: ${(props) => (props.disabled ? darkGray : darkerGray)};

  &.has-error {
    border-bottom-color: ${red};
    color: ${red};
  }

  ${(props) =>
    props.disabled
      ? ``
      : `
  &:focus,
  &:hover,
  &:active {
    border-bottom-color: ${royalBlue};
    box-shadow: 0 1px 0 0 ${royalBlue};
  }
  `};
`;

const { Option } = Select;

const SubLabel = styled.small`
  display: block;
  margin-top: 5px;
  font-size: ${small};
  color: ${(props) =>
    props.selected ? theme.colors.lightGray : theme.colors.green};
`;

const displaySelectedAddressFromLocation = (location) => {
  // for input display from selected location object or null
  // set null (e.g. feed store)
  if (!location) {
    return { value: "" };
  }
  const { address } = location;
  return { value: address, text: address };
};

const LocationInput = ({
  formError,
  location,
  onLocationChange,
  includeNavigator = false,
  gtmPrefix = "",
}) => {
  const { t } = useTranslation();
  // sessiontoken for combining autocomplete & place details into single usage
  // see: https://developers.google.com/maps/billing/gmp-billing#ac-with-details-session
  const [geoSessionToken, setGeoSessionToken] = useState(uuidv4());
  const [predictedAddresses, setPredictedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({ value: "" });
  const [loadingPredictions, setLoadingPredictions] = useState(false);
  const [loadingPlaceDetails, setLoadingPlaceDetails] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    setSelectedAddress(displaySelectedAddressFromLocation(location));
  }, [location, setSelectedAddress]);

  const fetchAddressPredictions = useRef(
    debounce(
      async (address) => {
        setApiError(null);
        setPredictedAddresses([]);
        if (address.length >= 3) {
          setLoadingPredictions(true);
          try {
            const { data } = await axios.get(
              `/api/geo/address-predictions?input=${address}&sessiontoken=${geoSessionToken}`,
            );
            const predictions = data.predictions.map((p) => ({
              text: p.description,
              value: p.place_id,
            }));
            setPredictedAddresses(predictions);
          } catch {
            setApiError(t("error.failedPredictions"));
          } finally {
            setLoadingPredictions(false);
          }
        }
      },
      500,
      { leading: true },
    ),
  ).current;

  const getAddressFromGeolocation = async () => {
    setApiError(null);
    setLoadingPlaceDetails(true);
    try {
      const { lat, lng } = await asyncGetGeoLocation();
      const { data } = await axios.get(
        `/api/geo/location-reverse-geocode?lat=${lat}&lng=${lng}`,
      );
      onLocationChange(data.location);
      setSelectedAddress(displaySelectedAddressFromLocation(data.location));
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      const translatedErrorMessage = t([
        `error.${message}`,
        `error.http.${message}`,
      ]);

      const errMessage = `${t(
        "error.failedLocation",
      )} ${translatedErrorMessage}. ${
        error.code === 1
          ? t("error.resetBrowserLocationPermission")
          : t("error.enterAddressAgain")
      }`;
      setApiError(errMessage);
    } finally {
      setLoadingPlaceDetails(false);
    }
  };

  const selectAddress = async (address) => {
    setApiError(null);
    if (!address) {
      // triggered w undefined by clear button
      onLocationChange(null);
      setSelectedAddress({ value: "" });
    } else {
      const { value: placeId } = address;
      setLoadingPlaceDetails(true);
      try {
        const { data } = await axios.get(
          `/api/geo/location-details?placeId=${placeId}&sessiontoken=${geoSessionToken}`,
        );
        setGeoSessionToken(uuidv4()); // session complete after getting place detail
        onLocationChange(data.location);
        setSelectedAddress(address);
        setPredictedAddresses([]);
      } catch {
        setApiError(t("error.failedLocationDetails"));
      } finally {
        setLoadingPlaceDetails(false);
      }
    }
  };

  return (
    <div>
      <StyledSelect
        id={gtmPrefix + GTM.locationInput.enterAddress}
        showArrow={false}
        showSearch
        allowClear={selectedAddress.value}
        labelInValue
        value={selectedAddress}
        onChange={selectAddress}
        onSearch={fetchAddressPredictions}
        disabled={loadingPlaceDetails}
        notFoundContent={loadingPredictions ? <Spin size="small" /> : null}
        bordered={false}
        filterOption={false}
      >
        {predictedAddresses.map((pa) => (
          <Option key={pa.value}>{pa.text}</Option>
        ))}
      </StyledSelect>
      <SubLabel selected={selectedAddress.value}>
        {t("feed.filters.location.enterAddress")}
      </SubLabel>
      {(apiError || formError) && (
        <InputError>{apiError || formError.message}</InputError>
      )}
      {includeNavigator && (
        <div>
          <WhiteSpace />
          <div
            id={gtmPrefix + GTM.locationInput.shareLocation}
            onClick={getAddressFromGeolocation}
            style={{ cursor: "pointer", fontSize: medium }}
            className="svgicon-share-mylocation-size"
          >
            <SvgIcon
              src={navigation}
              style={{ marginRight: "1rem", pointerEvents: "none" }}
            />
            {t("feed.filters.location.shareLocation")}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
