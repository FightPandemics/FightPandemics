import React, { useContext } from "react";
import styled from "styled-components";
import { SearchBar, WhiteSpace } from "antd-mobile";
import { FeedContext } from "pages/Feed.js";
import { Input } from 'antd';


// ICONS
import SvgIcon from "components/Icon/SvgIcon"
import navigation from "assets/icons/navigation.svg";
import searchBlue from "assets/icons/search-blue.svg";
import { theme } from "constants/theme";
const { white } = theme.colors;

const { colors } = theme;
const {
  lightGray,
} = colors;

const StyledSearchBar = styled(Input)`
    background-color: ${white};
    border: 0.1rem solid ${lightGray};
    border-radius: 4rem;
`;


const LocationSearch = () => {
  const feedContext = useContext(FeedContext);
  const { location, handleLocation } = feedContext;
  return (
    <div className="location-search">
      <WhiteSpace />
      <StyledSearchBar
        cancelText="Cancel"
        placeholder="Zip code, city, state..."
        maxLength={100}
        value={location}
        size="large"
        prefix={<SvgIcon src={(searchBlue)} />}
        onChange={handleLocation}
      />

      <WhiteSpace size="lg" />
      <WhiteSpace />
      <div className="svgicon-share-mylocation-size">
        <SvgIcon src={navigation} style={{ marginRight: "1rem" }} />
        Share My Location
      </div>
      <WhiteSpace />
    </div>
  );
};

export default LocationSearch;
