import React from 'react';
import styled from "styled-components";

import { Card, WhiteSpace } from 'antd-mobile';

import { theme } from "../../constants/theme";

const { colors, typography } = theme;
const {
  primary,
  royalBlue,
  orangeRed,
  mintGreen,
  lightGray,
  lighterGray } = colors;
const { medium, large, xlarge } = typography.size;

const HospitalCard = styled(Card)`
    border: 1px solid #ddd;
    transition: all .3s;
    &:hover {
      background-color: #F3F4FE;
    }
   .am-card-header {
      margin-right: 0;
   }
   .am-card-header-content {
      margin-right: 0;
      font-weight: bold;
      color: #282828;
      text-transform: uppercase;
   }
   .am-card-body {
     border-top: 0;
     color: rgba(0, 0, 0, 0.5);
     padding-top: 0;
   }
   .am-card-footer {
     font-weight: bold;
     color: ${primary};
     font-size: ${large};
     margin-right: 0;
   }
   .am-card-header-extra {
     margin-right: 0;
     font-size: ${medium};
   }
   .am-card-footer-content {
     font-weight: 600;
     color: #5970EC;
     margin-right: 0;
   }
   .am-card-footer-extra {
     font-size: ${large};
     margin-right: 0;
   }
`;


const openDateStyles = {
  paddingTop: '.8rem',
  fontWeight: '500'
}

const DescriptionCard = props => {
  const { hospitalName, hospitalAddress, openDate, contactNo, distance, isOpen } = props;

  return (
  <div>
  <WhiteSpace size="lg" />
    <HospitalCard full>
      <Card.Header
        title={hospitalName}
        extra={isOpen ?
          <span style={{ color: `${mintGreen}` }}>Open now</span>
          : <span style={{ color: `${orangeRed}` }}>Closed</span>}
      />
      <Card.Body>
        <div>{hospitalAddress}</div>
        <div style={openDateStyles}>{openDate}</div>
      </Card.Body>
      <Card.Footer content={contactNo} extra={distance} />
    </HospitalCard>
  </div>
 )
}

export default DescriptionCard;
