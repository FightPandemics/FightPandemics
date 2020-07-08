import React from "react";
import styled from "styled-components";

import { NavLink } from "react-router-dom";

import { theme } from "../../constants/theme";
const { colors, typography } = theme;
const { white, black, royalBlue } = colors;
const { large, xlarge } = typography.size;

const CheckSymptomsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${white};
  color: ${black};
  font-size: ${large};
  border: 1px solid rgba(156, 155, 155, 0.27);
  box-sizing: border-box;
  border-radius: 0.2rem;
  padding: 2rem;
  p {
    flex-basis: 47%;
    margin-bottom: 0;
    span {
      font-weight: bold;
    }
  }
`;

const SymptomsLink = styled(NavLink)`
  padding: 1.5rem 7.5rem;
  font-size: ${xlarge};
  background-color: ${royalBlue};
  color: ${white};
  text-decoration: none;
  text-align: center;
  border-radius: 5rem;
  display: block;
  transition: all 0.5s;
  &:hover {
    color: ${white};
    transform: scaleX(1.02);
  }
`;

const CheckSymptoms = (props) => {
  return (
    <CheckSymptomsBox>
      <p>
        Evaluate your health and receive instructions and recommendations about{" "}
        <span>COVID-19</span>
      </p>
      <div style={{ flexBasis: "46%" }}>
        <SymptomsLink to="/symptoms-check">Check Symptoms</SymptomsLink>
      </div>
    </CheckSymptomsBox>
  );
};

export default CheckSymptoms;
