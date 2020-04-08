import React from "react";
import styled from "styled-components";
import { SearchBar, Icon, WhiteSpace } from "antd-mobile";
import ShareLocationIcon from "../Icon/share-my-location";

const StyledSearchBar = styled(SearchBar)`
  &.am-search {
    background-color: #fff;
    border: 1px solid black;
    border-radius: 40px;
  }
`;

export default ({ location, handleLocation, shareMyLocation }) => {
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
      <div onClick={shareMyLocation}>
        <ShareLocationIcon style={{ marginRight: "10px" }} />
        Share My Location
      </div>
      <WhiteSpace />
    </div>
  );
};
