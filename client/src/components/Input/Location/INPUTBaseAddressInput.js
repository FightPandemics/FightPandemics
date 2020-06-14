import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Dropdown, Menu, Select } from "antd";
import { debounce } from "lodash";
import { v4 as uuidv4 } from "uuid";

import Input from "components/Input/BaseInput";
import InputError from "components/Input/InputError";
import ErrorAlert from "components/Alert/ErrorAlert";
import { inputStyles } from "constants/formStyles";
import { theme } from "constants/theme";

const { Option } = Select;

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

const StyledSelect = styled(Select)`
  width: 100%;
`;


const SubLabel = styled.small`
  color: ${(props) =>
    props.selected ? theme.colors.lightGray : theme.colors.green};
  display: block;
`;

const AddressInput = ({ location, error, onLocationChange }) => {
  // sessiontoken for combining autocomplete & place details into single usage
  // see: https://developers.google.com/maps/billing/gmp-billing#ac-with-details-session
  const [geoSessionToken, setGeoSessionToken] = useState(uuidv4());
  const [predictedAddresses, setPredictedAddresses] = useState([]);
  const [inputAddress, setInputAddress] = useState(location.address || "");
  const [loadingPlaceDetails, setLoadingPlaceDetails] = useState(false);
  const [apiError, setApiError] = useState(null);

  const debounceGetAddressPredictions = useRef(
    debounce(
      async (input) => {
        try {
          const {
            data: { predictions },
          } = await axios.get(
            `/api/geo/address-predictions?input=${input}&sessiontoken=${geoSessionToken}`,
          );
          setPredictedAddresses(predictions);
        } catch {
          setPredictedAddresses([]);
          setApiError("Failed getting predictions. Please retry.");
        }
      },
      500,
      { leading: true },
    ),
  );

  useEffect(() => {
    if (apiError) setApiError(null);
    if (location.address) {
      if (location.address === inputAddress) {
        // just selected the address? Clear predictions & nothing else
        return setPredictedAddresses([]);
      } else {
        // changes input after selected? Clear location & continue
        onLocationChange({});
      }
    }
    if (inputAddress.length >= 3) {
      debounceGetAddressPredictions.current(inputAddress);
    } else {
      setPredictedAddresses([]);
    }
    // Only call effect if input address changes
  }, [inputAddress]); // eslint-disable-line react-hooks/exhaustive-deps

  const onMenuItemClick = async (predictedAddress) => {
    if (predictedAddress?.place_id) {
      setLoadingPlaceDetails(true);
      try {
        const res = await axios.get(
          `/api/geo/location-details?placeId=${predictedAddress.place_id}&sessiontoken=${geoSessionToken}`,
        );
        setGeoSessionToken(uuidv4()); // session complete after getting place detail
        onLocationChange(res.data.location);
        setInputAddress(res.data.location.address);
      } catch {
        setApiError("Failed getting location details. Please retry.");
      } finally {
        setLoadingPlaceDetails(false);
      }
    }
  };

  // const menuItems = predictedAddresses.map((a) => (
  //   <Menu.Item onClick={() => onMenuItemClick(a)} key={a.id}>
  //     {a.description}
  //   </Menu.Item>
  // ));

  // const menu = <StyledMenu>{menuItems}</StyledMenu>;
  const options = predictedAddresses.map(a => {
    console.log(a);
    return (<Option key={a.place_id}>{a.description}</Option>)
  });
  return (
    <StyledSelect
      showSearch
      value={inputAddress}
      defaultActiveFirstOption={false}
      onChange={(v) => {
        console.log(v)
        onMenuItemClick(v)
      }}
      onSearch={(v) => {
        console.log(v);
        setInputAddress(v)
      }}
    >
      {options}
    </StyledSelect>
    // <Dropdown overlay={menu} visible={predictedAddresses.length > 0}>
    //   <div id="dropdown-anchor" style={{ position: "relative" }}>
    //     <Input
    //       type="text"
    //       id="location"
    //       onChange={(e) => setInputAddress(e.target.value)}
    //       disabled={loadingPlaceDetails}
    //       value={inputAddress}
    //       className={error && "has-error"}
    //       style={inputStyles}
    //     />
    //     {error && <InputError>{error.message}</InputError>}
    //     {apiError && <ErrorAlert message={apiError} />}
    //     <SubLabel selected={location.address}>
    //       Enter address, zip code, or city
    //     </SubLabel>
    //   </div>
    // </Dropdown>
  );
};

export default AddressInput;
