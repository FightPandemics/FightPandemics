import React from 'react';
import styled from "styled-components";

import { Card, WhiteSpace } from 'antd-mobile';

import { theme } from "../../constants/theme";

const { colors, typography } = theme;
const { royalBlue, lightGray, darkGray, selago, primary } = colors;
const { display } = typography.font.family;
const { xsmall, medium, large, xxlarge } = typography.size;

const HospitalCard = props => {
  const { hospitalName, hospitalAddress, openDate, contactNo, distance, isOpen, isActive } = props;


  const HospitalCard = styled(Card)`
      border: 1px solid #ddd;
      transition: all .3s;
      &:hover {
        background-color: #F3F4FE;
      }
     .am-card-header-content {
        font-weight: bold;
        color: #282828;
        text-transform: uppercase;
     }
     .am-card-body {
       border-top: none;
       padding-top: 0;
     }
     .am-card-footer {
       font-weight: bold;
       color: ${primary};
       font-size: ${large};
     }
     .am-card-header-extra {
       font-size: ${medium};
     }
     .am-card-footer-content {
       font-weight: 600;
     }
  `;

  const openDateStyles = {
    paddingTop: '1rem'
  }

  return (
  <div>
  <WhiteSpace size="lg" />
    <HospitalCard full>
      <Card.Header
        title={hospitalName}
        extra={isOpen ?
          <span style={{ color: "#209D7F" }}>Open now</span>
          : <span style={{ color: "#F5222D" }}>Closed</span>}
      />
      <Card.Body>
        <div>{hospitalAddress}</div>
        <div style={openDateStyles}>{openDate}</div>
      </Card.Body>
      <Card.Footer content={contactNo} extra={<div>{distance}</div>} />
    </HospitalCard>
  </div>
 )
}

export default HospitalCard;
