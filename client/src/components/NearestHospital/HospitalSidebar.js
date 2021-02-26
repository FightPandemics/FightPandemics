import React, { useState } from "react";
import styled from "styled-components";
import CheckSymptomsBox from "./CheckSymptomsBox";
import LocalEmergencyNumber from "./LocalEmergencyNumber";

const NavBar = styled.div`
  ul {
    list-style-type: none;
    padding: 1rem 0;
    li {
      margin: 2rem 0;
      a {
        text-decoration: none;
        transition: all 0.4s;
        color: inherit;
        padding-left: 2.5rem;
      }
      a:hover {
        font-weight: bold;
      }
    }
  }
`;

const HospitalSidebar = (props) => {
  return (
    <div>
      <NavBar>{props.children}</NavBar>
      <CheckSymptomsBox />
      <LocalEmergencyNumber />
    </div>
  );
};

export default HospitalSidebar;
