import React, { useContext } from "react";
import styled from "styled-components";
import { SearchBar, WhiteSpace } from "antd-mobile";
import { FeedContext } from "../../pages/Feed.js";

// ICONS
import SvgIcon from "../Icon/SvgIcon";
import shareLocation from "~/assets/icons/share-my-location.svg";

const StyledSearchBar = styled(SearchBar)`
  &.am-search {
    background-color: #fff;
    border: 0.1rem solid black;
    border-radius: 4rem;
  }
`;

const LocationSearch = () => {
  const feedContext = useContext(FeedContext);
  const { location, handleLocation } = feedContext;
  return (
    <div className="location-search">
      <WhiteSpace />
      <StyledSearchBar
        cancelText="Cancel"
        placeholder="Zip code, neighborhood, or city"
        maxLength={100}
        value={location}
        onChange={handleLocation}
      />
      <WhiteSpace size="lg" />
      <WhiteSpace />
      <div>
        <SvgIcon src={shareLocation} style={{ marginRight: "1rem" }} />
        Share My Location
      </div>
      <WhiteSpace />
    </div>
  );
};

export default LocationSearch;
