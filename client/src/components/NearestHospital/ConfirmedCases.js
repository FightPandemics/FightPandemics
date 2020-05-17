import React, { useState } from "react";
import styled from "styled-components";

import SearchInput from "../Input/SearchInput";

import { theme, mq } from "../../constants/theme";
const { typography, colors } = theme;
const { mediumGray } = colors;
const { large, xxxlarge } = typography.size;

const ConfirmedCasesContainer = styled.div`
  background-color: #fff;
  border: 0.2px solid rgba(185, 185, 185, 0.5);
  padding: 4rem 3rem;
  margin-top: 4rem;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    border: 0;
    padding: 0;
    margin-top: 0;
  }
`;

const ConfirmedCasesContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 6rem;
  div:not(:last-child) {
    border-right: 0.1rem solid #ccc;
  }
  div {
    padding: 0 5rem;
    h2 {
      font-weight: bold;
      font-size: ${xxxlarge};
      margin-bottom: 0;
    }
  }
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: block;
    margin-top: 0;
    div:not(:last-child) {
      border-right: 0;
    }
    div {
      padding: 3rem 0 0 2rem;
      border-bottom: 1px solid ${mediumGray};
      h2 {
        font-size: ${xxxlarge};
      }
      p {
        font-size: ${large};
        margin-bottom: 0.5em;
      }
    }
  }
`;

const SearchBarContainer = styled.div`
  width: 40%;
  @media screen and (max-width: ${mq.phone.wide.maxWidth}) {
    display: none;
  }
`;

const NearestHealthFacilities = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const onSearchInputChange = (value) => {
    setSearchValue(value);
  };
  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <ConfirmedCasesContainer>
      <SearchBarContainer>
        <SearchInput
          value={searchValue}
          placeholder=""
          onClear={clearSearch}
          onChange={onSearchInputChange}
        />
      </SearchBarContainer>
      <ConfirmedCasesContent>
        <div>
          <h2>420</h2>
          <p>Confirmed cases in Miami</p>
        </div>
        <div>
          <h2>2,051</h2>
          <p>Confirmed cases in USA</p>
        </div>
        <div>
          <h2>56,462</h2>
          <p>Confirmed cases in World</p>
        </div>
      </ConfirmedCasesContent>
    </ConfirmedCasesContainer>
  );
};

export default NearestHealthFacilities;
