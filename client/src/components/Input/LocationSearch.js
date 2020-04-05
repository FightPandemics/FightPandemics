import React, { useState } from "react";
import styled, { css } from "styled-components";
import { SearchBar, Icon, WhiteSpace } from "antd-mobile";

const StyledSearchBar = styled(SearchBar)`
  &.am-search {
    background-color: #fff;
    border: 1px solid black;
    border-radius: 40px;
  }
`;

export default () => {
  const [location, setLocation] = useState("");
  const shareMyLocation = () => {
    // integrate API endpoint
  };
  const onChange = (value) => {
    setLocation(value);
  };
  return (
    <div className="location-search">
      <WhiteSpace />
      <StyledSearchBar
        cancelText="Search"
        placeholder="Zip code, neighborhood, or city"
        maxLength={100}
        value={location}
        onChange={onChange}
      />
      <WhiteSpace />
      <div onClick={shareMyLocation} href="#">
        <Icon type="right" />
        Share My Location
      </div>
      <WhiteSpace />
    </div>
  );
};
