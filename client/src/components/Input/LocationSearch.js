import React from "react";
import styled from "styled-components";
import { SearchBar, Icon, WhiteSpace } from "antd-mobile";

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
      <div className="share-my-location" onClick={shareMyLocation}>
        <svg
          style={{ marginRight: "10px" }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0)">
            <path
              d="M0.281997 5.58382L15.3444 -0.961164C15.521 -1.03788 15.7265 -0.99882 15.8627 -0.862695C15.9988 -0.726539 16.0379 -0.520977 15.9612 -0.344415L9.41617 14.7181C9.34148 14.8899 9.17211 15 8.98639 15C8.97755 15 8.96864 14.9997 8.9598 14.9992C8.76377 14.9881 8.59542 14.8561 8.53802 14.6683L7.13452 10.0794C6.80986 9.01782 5.98224 8.19019 4.92065 7.86551L0.331716 6.46201C0.143996 6.40457 0.0119028 6.23623 0.000808716 6.04023C-0.0102844 5.84423 0.101934 5.66207 0.281997 5.58382Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                width="16"
                height="16"
                transform="matrix(-1 0 0 1 16 0)"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
        Share My Location
      </div>
      <WhiteSpace />
    </div>
  );
};
