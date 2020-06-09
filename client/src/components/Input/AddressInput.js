import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Dropdown, Menu } from "antd";
import { v4 as uuidv4 } from "uuid";

import Input from "components/Input/BaseInput";
import InputError from "components/Input/InputError";
import { inputStyles } from "constants/formStyles";
import { theme } from "constants/theme";

const StyledMenu = styled(Menu)`
  padding: ${theme.typography.size.xxsmall};
  width: 100%;
  .ant-dropdown-menu-item {
    display: flex;
    span {
      font-size: ${theme.typography.size.medium};
      margin-right: ${theme.typography.size.xxsmall};
      :first-child {
        color: ${theme.colors.darkerGray};
        font-weight: 500;
      }
      :last-child {
        margin: 0;
      }
    }
    &.ant-dropdown-menu-item-active {
      background-color: ${theme.colors.selago};
    }
  }
`;

const SubLabel = styled.small`
  color: ${props => props.selected ? theme.colors.lightGray : theme.colors.green};
  display: block;
`;

const AddressInput = ({ location, errors, onLocationChange }) => {
  // sessiontoken for combining autocomplete & place details into single usage
  // see: https://developers.google.com/maps/billing/gmp-billing#ac-with-details-session
  const [geoSessionToken, setGeoSessionToken] = useState(uuidv4());
  const [predictedAddresses, setPredictedAddresses] = useState([]);
  const [inputAddress, setInputAddress] = useState(location.address || "");
  const [loadingPlaceDetails, setLoadingPlaceDetails] = useState(false);

  const onInputChange = async (event) => {
    const input = event.target.value;
    setInputAddress(input);
    // reset location on change if previously set; TODO: consider X button to clear
    if (location.address) onLocationChange({});
    if (input.length >= 3) {
      const res = await axios.get(`/api/geo/address-predictions?input=${input}&sessiontoken=${geoSessionToken}`);
      setPredictedAddresses(res.data.predictions);
    } else { // clear predicted addresses (e.g. if deleting all)
      setPredictedAddresses([])
    }
  };

  const onMenuItemClick = async (predictedAddress) => {
    if (predictedAddress?.place_id) {
      console.log(geoSessionToken);
      setLoadingPlaceDetails(true);
      const res = await axios.get(`/api/geo/location-details?placeId=${predictedAddress.place_id}&sessiontoken=${geoSessionToken}`);
      setLoadingPlaceDetails(false);
      setGeoSessionToken(uuidv4()); // session complete after getting place detail
      onLocationChange(res.data.location);
      setInputAddress(res.data.location.address);
      setPredictedAddresses([]);
    }
  };

  const menuItems = predictedAddresses.map((a) => (
    <Menu.Item onClick={() => onMenuItemClick(a)} key={a.id}>{a.description}</Menu.Item>
  ));

  const menu = (
    <StyledMenu>
      {menuItems}
    </StyledMenu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div id="dropdown-anchor" style={{ position: "relative" }}>
        <Input
          type="text"
          id="location"
          onChange={onInputChange}
          disabled={setLoadingPlaceDetails}
          value={inputAddress}
          className={errors.location && "has-errors"}
          style={inputStyles}
        />
        {errors.location && (
          <InputError>{errors.location.message}</InputError>
        )}
        <SubLabel selected={location.address}>
          Enter address, zip code, or city
        </SubLabel>
      </div>
    </Dropdown>
  );
};

export default AddressInput;