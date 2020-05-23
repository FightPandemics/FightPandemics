import React from "react";
import styled from "styled-components";
import { NoticeBar } from "antd-mobile";

import { theme, mq } from "../../constants/theme";

const { typography } = theme;
const { xlarge, xxlarge, medium } = typography.size;
const { black, royalBlue, red, white } = theme.colors;

const EmergencyLine = styled(NoticeBar)`
  height: auto;
  background-color: ${red};
  color: ${white};
  margin-top: 3rem;
  position: relative;
  box-shadow: 0px 4px 1rem rgba(0, 0, 0, 0.05);
  border-radius: 0px 0px 0.4rem 0.4rem;
  font-size: ${xlarge};
  .am-notice-bar-content {
    margin: 0;
    padding-left: 1rem 4rem;
    font-weight: normal;
  }
  .am-notice-bar-operation {
    display: block;
    position: absolute;
    top: 2rem;
    right: 2.4rem;
  }
  h4 {
    color: ${white};
    margin-bottom: 0;
  }
  h3 {
    color: ${white};
  }
  @media screen and (min-width: ${mq.phone.wide.maxWidth}) {
    border: 1px solid rgba(185, 185, 185, 0.5);
    padding: 2rem;
    background-color: ${white};
    height: auto;
    box-shadow: none;
    .am-notice-bar-operation {
      display: none;
    }
    h4 {
      font-weight: bold;
      color: ${black};
      font-size: ${medium};
    }
    h3 {
      font-weight: bold;
      color: ${royalBlue};
      border-bottom: 1px solid ${royalBlue};
      display: inline;
      font-size: ${xxlarge};
      border-radius: 2px;
      padding: 0 0.4rem;
    }
  }

  @media screen and (max-width: ${mq.tablet.wide.maxWidth}) {
    padding: 2rem 8rem 2.1rem 4rem;
    margin-top: 0.8rem;
  }
`;

const LocalEmergencyNumber = (props) => {
  return (
    <EmergencyLine mode="closable" icon={null} {...props}>
      <h4>Local emergency number</h4>
      <h3>911</h3>
    </EmergencyLine>
  );
};

export default LocalEmergencyNumber;
