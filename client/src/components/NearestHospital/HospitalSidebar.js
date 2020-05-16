import React, { useState } from 'react';
import styled from "styled-components";

import SearchInput from "../Input/SearchInput";
import LocalEmergencyNumber from './LocalEmergencyNumber';

const SearchBarContainer = styled.div`
   padding: 5rem 0;
`;

const NavBar = styled.div`
   border-top: 0.2px solid rgba(0, 0, 0, 0.5);
   border-bottom: 0.2px solid rgba(0, 0, 0, 0.5);
   color: #282828;
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


const HospitalSidebar = props => {

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
          <SearchInput
            value={searchValue}
            placeholder=""
            onClear={clearSearch}
            onChange={onSearchInputChange}
           />
     </SearchBarContainer>
     <NavBar>
    {props.children}
     </NavBar>
     <LocalEmergencyNumber />
   </div>
)

}

export default HospitalSidebar;
