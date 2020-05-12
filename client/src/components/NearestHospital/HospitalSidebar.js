import React, { useState } from 'react';
import styled from "styled-components";

import { SearchBar } from 'antd-mobile';
import { NavLink } from "react-router-dom";
import LocalEmergencyNo from './LocalEmergencyNo';


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


  const [searchValue, setSearchValue] = useState('');

  const onSearchInputChange = (value) => {
    setSearchValue(value);
    console.log(searchValue);

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
     <LocalEmergencyNo />
   </div>
)

}

export default HospitalSidebar;
