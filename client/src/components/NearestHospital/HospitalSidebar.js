import React, { useState } from 'react';
import styled from "styled-components";

import { SearchBar } from 'antd-mobile';
import { NavLink } from "react-router-dom";

import { theme, mq } from "../../constants/theme";
const { colors } = theme;
const { typography } = theme;
const { xlarge } = typography.size;
const { primary } = colors;




const HospitalSidebar = props => {


const SearchBarContainer = styled.div`
   padding: 5rem 0;
`;

const NavBar = styled.div`
   border-top: 0.2px solid rgba(0, 0, 0, 0.5);
   border-bottom: 0.2px solid rgba(0, 0, 0, 0.5);
   ul {
     list-style-type: none;
     padding: 1rem 0;
     li {
        margin: 2rem 0;
           a {
             text-decoration: none;
             transition: all .4s;
             color: inherit;
             padding-left: 2.5rem;
           }
           a:hover {
             font-weight: bold;
           }
       }
     }

   }
`;

const EmergencyLine = styled.div`
    border: 0.2px solid rgba(185, 185, 185, 0.5);
    padding: 2rem;
    padding-left: 4rem;
    h4 {
      font-weight: bold;
    }
    h3 {
      font-weight: bold;
      color: ${primary};
      text-decoration: underline;
      font-size: ${xlarge};
    }
`;

const StyledSearchBar = styled(SearchBar)`
  &.am-search {
    background-color: #fff;
    border: 0.1rem solid rgba(0, 0, 0, 0.5);
    border-radius: 4rem;
  }
  .am-search-cancel-show {
    display: none;
   }
`;

const ActiveLinkStyles = {
  fontWeight: "bold",
  borderLeft: "4px solid #425af2",
  paddingLeft: "2rem"
}

const [ searchValue, setSearchValue ] = useState('');

const onSearchInputChange = (value) => {
  setSearchValue(value);
}
const clearSearch = () => {
  setSearchValue('');
}


return (
   <div>
     <SearchBarContainer>
          <StyledSearchBar
            value={searchValue}
            placeholder=""
            onClear={clearSearch}
            onChange={onSearchInputChange}
           />
     </SearchBarContainer>
     <NavBar>
        <ul>
           <li><NavLink activeStyle={ActiveLinkStyles} to="/nearest-hospital">Health Facilities</NavLink></li>
           <li><NavLink activeStyle={ActiveLinkStyles} to="/confirmed-cases">Confirmed Cases</NavLink></li>
        </ul>
     </NavBar>
     <EmergencyLine>
        <h4>Local emergency number</h4>
        <h3>911</h3>
     </EmergencyLine>
   </div>
)

}

export default HospitalSidebar;
