import React from 'react';
import styled from "styled-components";
import { SearchBar } from 'antd-mobile';

import { theme } from "../../constants/theme";
const { colors } = theme;



const StyledSearchBar = styled(SearchBar)`
  &.am-search {
    background-color: ${colors.white};
    border: 0.1rem solid rgba(0, 0, 0, 0.5);
    border-radius: 4rem;
  }
  .am-search-cancel-show {
    display: none;
   }
`;

const SearchInput = props =>  (
    <StyledSearchBar {...props} />
)

export default SearchInput;
